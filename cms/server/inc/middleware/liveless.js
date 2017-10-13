
var express = require("express");
var p = require("path");

var fs = require("fs");
var debug = require('debug')('liveless')
function liveless (conf){
	var less = require("less");
	var router = express.Router(),
			root = conf.root
			

	router.get("**.less",function(req,res,next){
		var path = req.path;
		var file = [root,path].join("/");
		debug('compileing %s', file)
		fs.existsAsync(file)
		.then(function(){
			return fs.readFileAsync(file);
		})
		.then(function(input){
			var opt = {
				paths : [root],
				relativeUrls : true,
				strictUnits : true,
				ieCompat : true,
				filename : file ,
				compress : false ,
				yuicompress : false
			};
			return less.render( input.toString() ,opt);
		})
		.then(function(output){
			res.type("css");
			res.send(output.css);
		})
		.catch(next);
	})
	
	return router;
}


module.exports = liveless;

