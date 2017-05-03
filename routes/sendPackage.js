var express = require('express');
var router = express.Router();

function sendPackage(req,res){
	console.log("here in send")	
	res.render('send_package.ejs')
}

exports.sendPackage = sendPackage;