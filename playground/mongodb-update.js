// const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

// var obj=new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) =>{
  if(err){
    return console.log('Unable to connect to mongodb server');
    }
    console.log('connected to MongoDb Server');

  db.collection('Users').findOneAndUpdate({
    name: "kk"
  },
 {
     $inc: {
       age: 1
     }
 },{
   returnOriginal: true

 }).then((docs)=>{
    console.log(JSON.stringify(docs,undefined,2));

  },(err)=>{
    console.log(err);
  });

    db.close();
});
