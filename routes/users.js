var mongo = require('./mongo')
var mongoURL = "mongodb://localhost:27017/social_delivery_system";


function home(req,res){
	res.render('userHome');
}

function login(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('customerDetails');
			coll.findOne({emailID:req.body.emailID, password:req.body.password}, function(err, user){
				// console.log(user);
				if(user){
					var result={"status":"200","name":user.firstName, "role":user.role};
					req.session.data={"userID":user.userID, "name":user.firstName + " " + user.lastName};
					console.log(req.session.data);
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
<<<<<<< HEAD
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

=======
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

>>>>>>> 7a5b5e0a8f702030216eb03290de4fc8cfa39b85
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
			coll.update({requestID: req.body.deliveryDetails.requestID},{ $set: {pickupLocation:{street:req.body.deliveryDetails.pickupLocation.street, apt:req.body.deliveryDetails.pickupLocation.apt, city:req.body.deliveryDetails.pickupLocation.city, state:req.body.deliveryDetails.pickupLocation.state, zip:req.body.deliveryDetails.pickupLocation.zip ,country:req.body.deliveryDetails.pickupLocation.country},
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

function deleteDeliveryRequest(req,res){ console.log(req.query.requestID);
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('shipperRequestPool');
			coll.remove({requestID: req.query.requestID}, function(err, success){
				if(success){
					var result={"status":"200", "msg":"This delivery is successfully deleted."};
				}else{
					var result={"status":"400", "msg":"Something went wrong, Please try again."};
				}
				res.send(result);
			});
	});
}



exports.login = login;
exports.home = home;
exports.getCustomerDetails = getCustomerDetails;
exports.updateCustomerProfile = updateCustomerProfile;
exports.updateCustomerCC = updateCustomerCC;
exports.updateCustomerPassword = updateCustomerPassword;
exports.sendPackage = sendPackage;
exports.getSingleDeliveryRequest = getSingleDeliveryRequest;
exports.getAllDeliveryRequests = getAllDeliveryRequests;
exports.updateDeliveryRequest = updateDeliveryRequest;
exports.deleteDeliveryRequest = deleteDeliveryRequest;
