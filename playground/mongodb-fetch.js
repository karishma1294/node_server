// const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

// var obj=new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) =>{
  if(err){
    return console.log('Unable to connect to mongodb server');
    }
    console.log('connected to MongoDb Server');

  db.collection('Users').find({
    _id: new ObjectID("5abbbca34f8d1d0e58bf922e")
  }).toArray().then((docs)=>{
    console.log(docs);

  },(err)=>{
    console.log(err);
  });

    db.close();
});
