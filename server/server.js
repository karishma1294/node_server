var express=require('express');
var bodyParser=require("body-parser");
var {ObjectID}=require('mongodb');

var {mongoose} =require('./db/mongoose');
var {Todo}=require("./models/todo");
var {User}=require("./models/user");

var app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());

// app.post('/Users',(req,res)=>{
//   var newUser=new User({
//     email:req.body.text
//   });
//   newUser.save().then((doc)=>{
//     res.send(doc);
//   },(err)=>{
//     res.status(404).send(err);
//   });
// });


app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
      res.send({todos});
    },(e)=>{
      res.status(400).send(e);
    });
});


app.post('/todos',(req,res)=>{
  var newTodo=new Todo({
    text:req.body.text
  });

  newTodo.save().then((doc)=>{
    res.send(doc);
  },(error)=>{
    res.status(400).send(error);
  });

});

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
 if(!ObjectID.isValid(id)){
   return res.status(404).send({});
 }
   Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
     }
     console.log("Id found",todo);
     res.send({todo});
   }).catch((e,res)=>{
     res.status(400).send({});
   });
});

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});

module.exports={app};
