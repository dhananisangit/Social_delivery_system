var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var arrayOfPools= [];
/**
 * Connects to the MongoDB Database with the provided URL
 */

// for(var i=0;i<100;i++){

// 	 MongoClient.connect("mongodb://sangitdhanani:sjsu1234@ds133211.mlab.com:33211/sds_mongo",function(err, _db){
// 	      if (err) { throw new Error('Could not connect: '+err); }
// 	      db = _db;
// 	      connected = true;
// 	      //console.log(connected +" is connected?");
// 	      arrayOfPools.push(db);
// 	  });

// }

// MongoClient.connect('mongodb://gohan:gohan@ds129038.mlab.com:29038/todo-posting', (err, database) => {
//   if (err) return console.log(err)
//   db = database
//   app.listen(process.env.PORT || 3000, () => {
//     console.log('listening on 3000')
//   })
// })



// function getConnectionFromPool(){
// 	var connection = arrayOfPools.pop();
// 	return connection;
// }
// function releaseConnectionFromPool(connection){
// 	arrayOfPools.push(connection);
// }

exports.connect = function(url, callback){
	MongoClient.connect("mongodb://localhost:27017/social_delivery_system",function(err, _db){
	// MongoClient.connect("mongodb://sangitdhanani:sjsu1234@ds133211.mlab.com:33211/sds_mongo",function(err, _db){
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
