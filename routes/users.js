var mongo = require('./mongo')
// var mongoURL = "mongodb://localhost:27017/social_delivery_system";
var mongoURL = "mongodb://sangitdhanani:sjsu1234@ds133211.mlab.com:33211/sds_mongo";

function login(req,res){
	mongo.connect(mongoURL, function(){
			var coll = mongo.collection('adminDetail');
			coll.findOne({emailID:req.body.emailID, password:req.body.password}, function(err, user){
				if(user){
					var result={"status":"200","name":user.Name};
				}else{
					var result={"status":"400","msg":"Either email or password is incorrect"};
				}
				res.send(result)
			});	
	});
}

exports.login = login;