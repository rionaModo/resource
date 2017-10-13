var _ = require("lodash");

/**
 * 这个只是针对字符串参数进行验证，并不是判断数值类型.
 * @type {[type]}
 */
var ValidateGroup = require("./ValidateGroup");
exports.create = function(rules){
	return new ValidateGroup(rules);
}

exports.ValidateGroup = ValidateGroup;
exports.common = require("./common");
