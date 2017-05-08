var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var arrayOfPools= [];
/**
 * Connects to the MongoDB Database with the provided URL
 */


exports.connect = function(url, callback){
	MongoClient.connect("mongodb://sangitdhanani:sjsu1234@ds133211.mlab.com:33211/sds_mongo",function(err, _db){
	if (err) { throw new Error('Could not connect: '+err); }
	  db = _db;

	  connected = true;
	  // arrayOfPools.push(db);
	  callback(db);
	});
};

// exports.disconnect = function(db, callback){
// 	releaseConnectionFromPool(connected);

// };

// /**
//  * Returns the collection on the selected database
//  */
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};