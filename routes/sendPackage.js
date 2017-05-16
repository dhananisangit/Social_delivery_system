var express = require('express');
var router = express.Router();

function sendPackage(req,res){
	res.render('send_package.ejs')
}

exports.sendPackage = sendPackage;
