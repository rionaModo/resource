var ValidateGroup = require("./ValidateGroup");
var _ = require("lodash");

module.exports = new ValidateGroup([
{
	name : "int",
	rule : /^\d+$/,
	msg : "%s 必须为整数."
},
{
	name : "email",
	rule : /^[a-zA-Z_]\w+?@\w+?\.(com|cn|net)/,
	msg : "%s 必须为email格式"
},

{
	name : "not_empty",
	rule : function(value) {
		if(!value){
			return false;
		}
		value = _.trim(value);
		return value != "";
	},
	msg : "%s 必须不能为空"
},
{
	name : "true",
	rule : function(value){
		return true;
	}
}

]);