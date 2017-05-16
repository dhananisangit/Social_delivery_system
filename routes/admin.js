var mongo = require('./mongo')
var mongoURL = "mongodb://sangitdhanani:sjsu1234@ds133211.mlab.com:33211/sds_mongo";

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

function getCustomerFeedback(req,res){
	console.log(req.session.data.userID)
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerFeedback');
			coll.find({userID:req.body.userID}).toArray(function(err, reviews){
			if(reviews){
				var result = {"status":"200","reviews":reviews};

			}
			else{
				var result = {"status":"400"};

			}
			res.send(result)
		});
	});
}

function getCustomerDetails(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerFeedback');
			coll.find({"userID":req.session.data.userID}).toArray(function(err, reviews){
			if(reviews){
				console.log(reviews)
				var coll1 = mongo.collection('customerDetails');
				coll1.find({"userID": req.session.data.userID}).toArray(function(err, details){
					if(details){
						console.log(details)
						var result = {"status":"200", "reviews": reviews, "details":details}
							res.send(result)
					}
					else{
						var result = {"status":"400"};
					}
				})
			}
			else {
					var result = {"status":"400"}
			}


		});
	});
}




function revenuePerLocation(req,res){
	var data = [];

	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('tripDetails');
		coll.aggregate([{ $group: { _id: {pickupState:"$pickupLocation.state"}, count: { $sum:"$packageDetails.price" } } }]).toArray(function(err, revenuePerLocation){
			if(revenuePerLocation){
				for(var i=0;i<revenuePerLocation.length;i++){

					data[i] = {"label": revenuePerLocation[i]._id.pickupState, "value": revenuePerLocation[i].count};
				}
				var result = {"status":"200","revenuePerLocation":data};
			}
			else{
				var result = {"status":"400"};
			}
			// console.log(result)
			res.send(result)
		});
	});
}


function tripsPerLocation(req,res){
	var data = [];
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('tripDetails');
		coll.aggregate([{ $group: { _id: {pickupState:"$pickupLocation.state"}, count: { $sum: 1 } } }]).toArray(function(err, tripsPerLocationArray){
			if(tripsPerLocationArray){
				for(var i=0;i<tripsPerLocationArray.length;i++){
					data[i] = {"label": tripsPerLocationArray[i]._id.pickupState, "value": tripsPerLocationArray[i].count};
				}
				var result = {"status":"200","tripsPerLocation":data};
			}
			else{
				var result = {"status":"400"};
			}
			res.send(result)
		});
	});
}

function ridesPerArea(req,res){
	var data = [];
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('tripDetails');
		coll.aggregate([{ $group: { _id: {dropoffLocation:"$dropoffLocation.state"}, count: { $sum: 1 } } }]).toArray(function(err, ridesPerAreaArray){
			if(ridesPerAreaArray){
				for(var i=0;i<ridesPerAreaArray.length;i++){
					data[i] = {"label": ridesPerAreaArray[i]._id.dropoffLocation, "value": ridesPerAreaArray[i].count};
				}
				var result = {"status":"200","ridesPerArea":data};
			}
			else{
				var result = {"status":"400"};
			}
			res.send(result)
		});
	});
}


function ridesPerDriver(req,res){
	var data = [];
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('tripDetails');
		coll.aggregate([{ $group: { _id: {transporterID:"$transporter.id",driver_name:"$transporter.name"}, count: { $sum: "$packageDetails.price" } } }]).limit(20).toArray(function(err, ridesPerDriverArray){
			if(ridesPerDriverArray){
				for(var i=0;i<ridesPerDriverArray.length;i++){
					data[i] = {"label": ridesPerDriverArray[i]._id.driver_name, "value": ridesPerDriverArray[i].count};
				}
				var result = {"status":"200","ridesPerDriver":data};
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
exports.revenuePerLocation = revenuePerLocation;
exports.tripsPerLocation = tripsPerLocation;
exports.ridesPerArea = ridesPerArea;
exports.ridesPerDriver = ridesPerDriver;
exports.getCustomerFeedback = getCustomerFeedback;
exports.getCustomerDetails = getCustomerDetails;
