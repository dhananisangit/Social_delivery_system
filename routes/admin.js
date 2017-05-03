var mongo = require('./mongo')
var mongoURL = "mongodb://localhost:27017/social_delivery_system";

function home(req,res){
	res.render('adminHome');	
}



function getCustomerList(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.find({}).toArray(function(err, customers){
			if(customers){
				var result = {"status":"200","customerList":customers};
				
			}
			else{
				var result = {"status":"400"};
				
			}
			res.send(result)
		});
	});
}


function getBillList(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('tripDetails');
			coll.find({}).toArray(function(err, bills){
			if(bills){
				var result = {"status":"200","billList":bills};
				
			}
			else{
				var result = {"status":"400"};
				
			}
			res.send(result)
		});
	});
}


function getOpenShipperRequests(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.find({}).toArray(function(err, req){
			if(req){
				var result = {"status":"200","shipperRequests":req};
				
			}
			else{
				var result = {"status":"400"};
				
			}
			res.send(result)
		});
	});
}


function getOpenTransporterRequests(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('transporterRequestPool');
			coll.find({}).toArray(function(err, req){
			if(req){
				var result = {"status":"200","transporterRequests":req};
				
			}
			else{
				var result = {"status":"400"};
				
			}
			res.send(result)
		});
	});
}


exports.home = home;
exports.getCustomerList = getCustomerList;
exports.getBillList = getBillList;
exports.getOpenShipperRequests = getOpenShipperRequests;
exports.getOpenTransporterRequests = getOpenTransporterRequests;