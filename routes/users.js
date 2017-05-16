var mongo = require('./mongo')
var mongoURL = "mongodb://sangitdhanani:sjsu1234@ds133211.mlab.com:33211/sds_mongo";


function home(req,res){
	res.render('userHome');
}

function inbox(req,res){
	res.render('inbox');
}

function login(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.findOne({emailID:req.body.emailID, password:req.body.password}, function(err, user){
				if(user){
					var result={"status":"200","name":user.firstName, "role":user.role};
					req.session.data={"userID":user.userID, "name":user.firstName + " " + user.lastName};
				}else{
					var result={"status":"400","msg":"Either email or password is incorrect"};
				}
				res.send(result)
			});
	});
}

function getCustomerDetails(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.findOne({userID:req.session.data.userID}, function(err, userDetails){
				// console.log(userDetails);
				if(userDetails){
					var result={"status":"200", "userDetails":userDetails};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function updateCustomerProfile(req,res){
	mongo.connect(mongoURL, function(){ console.log("update" + req.body.profile.firstName);
			var coll = mongo.collection('customerDetails');
			coll.update({userID:req.session.data.userID},{ $set: {firstName:req.body.profile.firstName, lastName:req.body.profile.lastName, address:[{street:req.body.profile.address[0].street, apt:req.body.profile.address[0].apt, city:req.body.profile.address[0].city, state:req.body.profile.address[0].state, zip:req.body.profile.address[0].zip,
				country:req.body.profile.address[0].country}]}}, function(err, success){
				if(success){
					var result={"status":"200", "msg":"Your profile details are successfully updated.."};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function updateCustomerCC(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.update({userID:req.session.data.userID},{ $set: {ccInfo:[{number:req.body.ccInfo.name, cvv:req.body.ccInfo.cvv, expMonth:req.body.ccInfo.expMonth, expYear:req.body.ccInfo.expYear, type:req.body.ccInfo.type, cardHolder:req.body.ccInfo.cardHolder, billingAddress:{street:req.body.ccInfo.billingAddress.street,
				apt:req.body.ccInfo.billingAddress.apt, city:req.body.ccInfo.billingAddress.city, state:req.body.ccInfo.billingAddress.state, zip:req.body.ccInfo.billingAddress.zip, country:req.body.ccInfo.billingAddress.country}}]}}, function(err, success){
				if(success){
					var result={"status":"200", "msg":"Your credit card details are successfully updated.."};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function updateCustomerPassword(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.findOne({userID:req.session.data.userID, password:req.body.oldPassword}, function(err, customerDetails){
			if(customerDetails){

				coll.update({userID:req.session.data.userID},{ $set: {"password": req.body.newPassword}}, function(err, success){
					if(success){
						var result={"status":"200","msg":"Password updated successfully"};
					}else{
						var result={"status":"400","msg":"Something went wrong, Please try again."};
					}
					res.send(result);
				});

			}else{
				var result={"status":"400","msg":"Please enter correct old password."};
				res.send(result);
			}
		});
	});
}

function sendPackage(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			var d = new Date();
			d = d.getTime().toString();
			// coll.insert({userID:"1232132121", name:"Sangit Dhanani1", pickupLocation:{street:"754 the alameda", apt:"2311", city:"San Jose", state:"CA",zip:"95126",country:"USA"}, dropoffLocation:{street:"754 the alameda", apt:"2311", city:"San Jose", state:"CA",zip:"95126",country:"USA"}, packageDetails:{title:"Chair", note:"light weight", size:"Medium",price:"$38.00"}, desiredDate:"2017-05-20"}, function(err, user){
			coll.insert({userID:req.session.data.userID, name:req.session.data.name, pickupLocation:{street:req.body.deliveryRequest.pickupLocation.street, apt:req.body.deliveryRequest.pickupLocation.apt, city:req.body.deliveryRequest.pickupLocation.city, state:req.body.deliveryRequest.pickupLocation.state, zip:req.body.deliveryRequest.pickupLocation.zip ,
				country:req.body.deliveryRequest.pickupLocation.country}, dropoffLocation:{street:req.body.deliveryRequest.dropoffLocation.street, apt:req.body.deliveryRequest.dropoffLocation.apt, city:req.body.deliveryRequest.dropoffLocation.city, state:req.body.deliveryRequest.dropoffLocation.state, zip:req.body.deliveryRequest.dropoffLocation.zip, country:req.body.deliveryRequest.dropoffLocation.country},
				packageDetails:{title:req.body.deliveryRequest.packageDetails.title, note:req.body.deliveryRequest.packageDetails.note, size:req.body.deliveryRequest.packageDetails.size, price:req.body.deliveryRequest.packageDetails.price}, desiredDate:req.body.deliveryRequest.desiredDate,
				timestamp: d}, function(err, user){
				// console.log(user)
				if(user){
					var result={"status":"200","msg":"Your request has been submitted."};
				}else{
					var result={"status":"400","msg":"Something went wrong. Please try again."};
				}
				res.send(result)
			});
	});
}

function getSingleDeliveryRequest(req,res){

	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.findOne({requestID: req.query.requestID}, function(err, delivery){
				// console.log(delivery);
				if(delivery){
					var result={"status":"200","delivery":delivery};
				}else{
					var result={"status":"400","msg":"Something went wrong. Please try again."};
				}
				res.send(result);
			});
	});
}


function updateCustomerCC(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.update({userID:req.session.data.userID},{ $set: {ccInfo:[{number:req.body.ccInfo.name, cvv:req.body.ccInfo.cvv, expMonth:req.body.ccInfo.expMonth, expYear:req.body.ccInfo.expYear, type:req.body.ccInfo.type, cardHolder:req.body.ccInfo.cardHolder, billingAddress:{street:req.body.ccInfo.billingAddress.street,
				apt:req.body.ccInfo.billingAddress.apt, city:req.body.ccInfo.billingAddress.city, state:req.body.ccInfo.billingAddress.state, zip:req.body.ccInfo.billingAddress.zip, country:req.body.ccInfo.billingAddress.country}}]}}, function(err, success){
				if(success){
					var result={"status":"200", "msg":"Your credit card details are successfully updated.."};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function updateCustomerPassword(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.findOne({userID:req.session.data.userID, password:req.body.oldPassword}, function(err, customerDetails){
			if(customerDetails){

				coll.update({userID:req.session.data.userID},{ $set: {"password": req.body.newPassword}}, function(err, success){
					if(success){
						var result={"status":"200","msg":"Password updated successfully"};
					}else{
						var result={"status":"400","msg":"Something went wrong, Please try again."};
					}
					res.send(result);
				});

			}else{
				var result={"status":"400","msg":"Please enter correct old password."};
				res.send(result);
			}
		});
	});
}

function sendPackage(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			// coll.insert({userID:"1232132121", name:"Sangit Dhanani1", pickupLocation:{street:"754 the alameda", apt:"2311", city:"San Jose", state:"CA",zip:"95126",country:"USA"}, dropoffLocation:{street:"754 the alameda", apt:"2311", city:"San Jose", state:"CA",zip:"95126",country:"USA"}, packageDetails:{title:"Chair", note:"light weight", size:"Medium",price:"$38.00"}, desiredDate:"2017-05-20"}, function(err, user){
			coll.insert({requestID:"req" + req.session.data.userID, userID:req.session.data.userID, name:req.session.data.name, pickupLocation:{street:req.body.deliveryRequest.pickupLocation.street, apt:req.body.deliveryRequest.pickupLocation.apt, city:req.body.deliveryRequest.pickupLocation.city, state:req.body.deliveryRequest.pickupLocation.state, zip:req.body.deliveryRequest.pickupLocation.zip ,
				country:req.body.deliveryRequest.pickupLocation.country}, dropoffLocation:{street:req.body.deliveryRequest.dropoffLocation.street, apt:req.body.deliveryRequest.dropoffLocation.apt, city:req.body.deliveryRequest.dropoffLocation.city, state:req.body.deliveryRequest.dropoffLocation.state, zip:req.body.deliveryRequest.dropoffLocation.zip, country:req.body.deliveryRequest.dropoffLocation.country},
				packageDetails:{title:req.body.deliveryRequest.packageDetails.title, note:req.body.deliveryRequest.packageDetails.note, size:req.body.deliveryRequest.packageDetails.size, price:req.body.deliveryRequest.packageDetails.price}, desiredDate:req.body.deliveryRequest.desiredDate}, function(err, user){
				// console.log(user)
				if(user){
					var result={"status":"200","msg":"Your request has been submitted."};
				}else{
					var result={"status":"400","msg":"Something went wrong. Please try again."};
				}
				res.send(result)
			});
	});
}

function getSingleDeliveryRequest(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.findOne({$and: [{userID: req.session.data.userID}, {timestamp: req.query.timestamp}]}, function(err, delivery){
				// console.log(delivery);
				if(delivery){
					var result={"status":"200","delivery":delivery};
				}else{
					var result={"status":"400","msg":"Something went wrong. Please try again."};
				}
				res.send(result);
			});
	});
}

function getAllDeliveryRequests(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.find({userID:req.session.data.userID}).toArray(function(err, deliveries){
				// console.log(deliveries);

				if(deliveries){
					var result={"status":"200","deliveries":deliveries};
				}else{
					var result={"status":"400","msg":"Something went wrong. Please try again."};
				}
				res.send(result)
			});
	});
}

function updateDeliveryRequest(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.update({$and: [{userID: req.session.data.userID}, {timestamp: req.body.deliveryDetails.timestamp}]},{ $set: {pickupLocation:{street:req.body.deliveryDetails.pickupLocation.street, apt:req.body.deliveryDetails.pickupLocation.apt, city:req.body.deliveryDetails.pickupLocation.city, state:req.body.deliveryDetails.pickupLocation.state, zip:req.body.deliveryDetails.pickupLocation.zip ,country:req.body.deliveryDetails.pickupLocation.country},
				dropoffLocation:{street:req.body.deliveryDetails.dropoffLocation.street, apt:req.body.deliveryDetails.dropoffLocation.apt, city:req.body.deliveryDetails.dropoffLocation.city, state:req.body.deliveryDetails.dropoffLocation.state, zip:req.body.deliveryDetails.dropoffLocation.zip, country:req.body.deliveryDetails.dropoffLocation.country}, packageDetails:{title:req.body.deliveryDetails.packageDetails.title, note:req.body.deliveryDetails.packageDetails.note, size:req.body.deliveryDetails.packageDetails.size, price:req.body.deliveryDetails.packageDetails.price}, desiredDate:req.body.deliveryDetails.desiredDate}}, function(err, success){
				if(success){
					var result={"status":"200", "msg":"Your delivery details are successfully updated."};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function deleteDeliveryRequest(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.remove({$and: [{userID: req.session.data.userID}, {timestamp: req.query.timestamp}]}, function(err, success){
				if(success){
					var result={"status":"200", "msg":"This delivery is successfully deleted."};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function searchTask(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.find({$and: [{"pickupLocation.city": req.query.fromCity}, {"pickupLocation.state": req.query.fromState},
				{"dropoffLocation.city": req.query.toCity}, {"dropoffLocation.state": req.query.toState},
				{"packageDetails.size": req.query.size}, {"desiredDate": req.query.date}]}).toArray(function(err, taskSuggestions){
				if(taskSuggestions){
					// console.log(taskSuggestions);
					var result={"status":"200", "taskSuggestions":taskSuggestions};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function makeOffer(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			var d = new Date();
			d = d.toString();
			coll.update({$and: [{userID: req.query.userID}, {timestamp: req.query.timestamp}]}, {$push:{offers: {userID: req.session.data.userID, name: req.session.data.name, message:req.query.msg, when: d}}}, function(err, success){
				if(success){

					var coll2 = mongo.collection('customerDetails');
					coll2.update({userID: req.query.userID}, {$push:{notifications: {userID: req.session.data.userID, name: req.session.data.name, message:req.query.msg, when: d}}}, function(err, success){
						if(success){
							// console.log(success);
							var result={"status":"200", "msg":"Your offer has been sent to this user."};
						}else{
							var result={"status":"400", "msg":"Something went wrong, Please try again."};
						}
						res.send(result);
					});
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
					res.send(result);
				}
			});
	});
}

function acceptOffer(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('tripDetails');
			var d = new Date();
			d = d.getTime().toString();
			coll.insert({transporter: {id:req.body.tripDetails.transporter.id, name:req.body.tripDetails.transporter.name}, shipper: {id:req.session.data.userID, name:req.session.data.name},
				packageDetails: {title:req.body.tripDetails.packageDetails.title, note:req.body.tripDetails.packageDetails.note, size:req.body.tripDetails.packageDetails.size, price:req.body.tripDetails.packageDetails.price},
				pickupLocation: {street:req.body.tripDetails.pickupLocation.street, apt:req.body.tripDetails.pickupLocation.apt, city:req.body.tripDetails.pickupLocation.city, state:req.body.tripDetails.pickupLocation.state, zip:req.body.tripDetails.pickupLocation.zip, country:req.body.tripDetails.pickupLocation.country},
				dropoffLocation: {street:req.body.tripDetails.dropoffLocation.street, apt:req.body.tripDetails.dropoffLocation.apt, city:req.body.tripDetails.dropoffLocation.city, state:req.body.tripDetails.dropoffLocation.state, zip:req.body.tripDetails.dropoffLocation.zip, country:req.body.tripDetails.dropoffLocation.country},
				completed: false, timestamp: d}, function(err, success){
				if(success){
					// console.log(req.body.tripDetails.timestamp);

					var coll2 = mongo.collection('shipperRequestPool');
					coll2.remove({$and: [{userID: req.body.tripDetails.userID}, {timestamp: req.body.tripDetails.timestamp}]}, function(err, success){
						if(success){
							console.log("inside remove");
							var result={"status":"200", "msg":"You have successfully accepted the offer."};
						}else{
							// console.log(err);
							var result={"status":"400", "msg":"Something went wrong, Please try again."};
						}
						res.send(result);
					});
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
					res.send(result);
				}
			});
	});
}

function getTaskList(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('tripDetails');
			coll.find({$and: [{"transporter.id": req.session.data.userID}, {completed: false}]}).toArray(function(err, taskList){
				if(taskList){
					// console.log(success);
					var result={"status":"200", "taskList":taskList};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function getTripList(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('tripDetails');
			coll.find({$and: [{"transporter.id": req.session.data.userID}, {completed: true}]}).toArray(function(err, tripList){
				if(tripList){
					// console.log(success);
					var result={"status":"200", "tripList":tripList};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}

function completeTrip(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('tripDetails');
			var d = new Date();
			d = d.getTime().toString();
			coll.update({$and: [{"transporter.id": req.session.data.userID}, {timestamp: req.body.timestamp}]}, {$set: {completed: true}}, function(err, success){
				if(success){

					var coll2 = mongo.collection('customerDetails');
					coll2.update({userID: req.body.userID}, {$push:{notifications: {userID: req.session.data.userID, name: req.session.data.name, message:"Your package has been successfully delievered.", when: d}}}, function(err, success){
						if(success){
							// console.log(success);
							var result={"status":"200", "msg":"Your package has been successfully delievered."};
						}else{
							var result={"status":"400", "msg":"Something went wrong, Please try again."};
						}
						res.send(result);
					});

				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
					res.send(result);
				}
			});
	});
}

function getOpenShipperRequests(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.find({}).limit(10).toArray(function(err, req){
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

//
//
// function getTripList(req, res){
// 		mongo.connect(mongoURL, function(){
// 			var coll = mongo.collection('shipperRequestPool');
// 			// coll.find({userID:req.body.userID}).toArray(function(err, reviews){
// 			coll.find({userID: req.session.data.userID}).toArray(function(err, trip){
// 				if(trip){
// 					var result={"status":"200", "trips":trip};
// 				}else{
// 					var result={"status":"400", "msg":"Something went wrong, Please try again."};
// 				}
// 				res.send(result);
// 			});
// 		})
// }



exports.login = login;
exports.home = home;
exports.inbox = inbox;
exports.getCustomerDetails = getCustomerDetails;
exports.updateCustomerProfile = updateCustomerProfile;
exports.updateCustomerCC = updateCustomerCC;
exports.updateCustomerPassword = updateCustomerPassword;
exports.sendPackage = sendPackage;
exports.getSingleDeliveryRequest = getSingleDeliveryRequest;
exports.getAllDeliveryRequests = getAllDeliveryRequests;
exports.updateDeliveryRequest = updateDeliveryRequest;
exports.deleteDeliveryRequest = deleteDeliveryRequest;
exports.searchTask = searchTask;
exports.makeOffer = makeOffer;
exports.acceptOffer = acceptOffer;
exports.getTaskList = getTaskList;
exports.getTripList = getTripList;
exports.completeTrip = completeTrip;
exports.getOpenShipperRequests = getOpenShipperRequests;
