var express=require('express');
var bodyParser=require("body-parser");

var {mongoose} =require('./db/mongoose');
var {Todo}=require("./models/todo");
var {User}=require("./models/user");

var app=express();

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

app.listen(3000,()=>{
  console.log('Started on port 3000');
});

module.exports={app};
