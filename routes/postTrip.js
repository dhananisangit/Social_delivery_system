var express = require('express');
var router = express.Router();

function postTrip(req,res){
	res.render('post_trip.ejs')
}

exports.postTrip = postTrip;
