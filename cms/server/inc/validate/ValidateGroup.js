var _ = require("lodash");
var util = require("util");

module.exports = ValidateGroup;
ValidateGroup.Rule = Rule;

function ValidateGroup(rules) {
	if (!rules) {
		rules = [];
	}
	if (!_.isArray(rules)) {
		rules = [rules]
	}

	this.rules = {};

	for (var i = 0; i < rules.length; i++) {
		var r = rules[i];
		if (!r.name || !_.isString(r.name)) {
			throw new TypeError("name类型为：String");
		}
		// 如果是rule 实例，则根据Rule创建新的 Rule对象 ，且 r.msg 本次设置消息优先
		if (r.rule instanceof Rule) {
			this.rules[r.name] = new Rule(r.rule.rule, r.msg || r.rule.msg);
		} else {
			this.rules[r.name] = new Rule(r.rule, r.msg);
		}
	}
}
/**
 * 获取名为name 的 Rule
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
ValidateGroup.prototype.get = function(name) {
	if (this.rules[name]) {
		return this.rules[name];
	} else {
		throw new Error(name + " 校验规则未定义！")
	}
};

/**
 * 根据当前有的map信息，生成一个可用于构造新的 ValidateGroup 所使用的规则列表
 * @param  {Object} map{
 *      新的名称 : "已有的名称"
 * }
 *   name:"int"
 * }
 * @return {[type]}     [description]
 */
ValidateGroup.prototype.map = function(map) {
	if (!_.isPlainObject(map)) {
		throw new Error("需要为名称映射对象");
	}
	var that = this;
	var ruleList = [];
	_.each(map, function(v, key) {
		var rule = that.rules[v];
		if (!rule) {
			throw new Error(v + " 校验规则未定义！");
		}
		ruleList.push({
			name: key,
			rule: rule.rule,
			msg: rule.msg
		});

	});

	return ruleList;
};

//返回一个检查数据类型的中间件：并且将数据整合到一个数据obj，可以直接
//此中间件中如果有数据检测不符合规则，则生成报错信息。
ValidateGroup.prototype.param = function() {

	var that = this;
	if (!arguments.length) {
		throw new Error("没有任何参数参入");
	}

	var paramList = [];

	paramParamList(arguments);

	function paramParamList(args) {

		_.each(args, function(v) {
			var paramKey, ruleKey;

			if (_.isString(v)) {
				paramKey = ruleKey = v;
			}
			if (_.isArray(v)) {
				paramParamList(v);
				return;
			}

			if (_.isPlainObject(v)) {
				_.each(v, function(v, i) {
					addParam(i, v);
				});
				return;
			}

			addParam(ruleKey, ruleKey);

		});
	}

	function addParam(paramKey, ruleKey) {
		if (!_.isString(paramKey) || !_.isString(ruleKey)) {
			throw new Error("参数名与校验规则名必须为：String类型");
		}
		var rule = that.rules[ruleKey];
		if (!rule) {
			throw new Error(ruleKey + "校验规则未定义！");
		}
		paramList.push({
			key: paramKey,
			rule: rule
		});
	}


	var check = function(req, res, next) {
		var message = [];
		req.validate = req.validate || {};

		_.forEach(paramList, function(param) {
			var key = param.key;
			var value = req.param(key);
			var rule = param.rule;
			if (rule.validate(value, req)) {
				//验证通过则放在validate上
				req.validate[key] = value;
			} else {
				message.push({
					key: key,
					msg: util.format(rule.msg, key)
				});
			}
		});

		if (message.length) {
			//这儿可以优化为输出 验证不通过的合集
			next(message)
		} else {
			next();
		}
	};

	return check;

};



function Rule(rule, msg) {
	if (!rule) {
		throw new Error("未传入验证规则");
	}
	this.msg = msg;
	// 规则是自定义函数，则直接使用
	this.rule = rule;
	this.validate = function(value) {
		if (_.isFunction(rule)) {
			return rule(value);
		}
		// 正则匹配
		else if (_.isRegExp(rule)) {
			return rule.test(value);
		}
		// 字符串比对
		else {
			return value == rule;
		}
	}
}