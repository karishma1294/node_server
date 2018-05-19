require('./config/config');

const _=require("lodash");
const express=require('express');
const bodyParser=require("body-parser");
const bcrypt=require("bcryptjs");
var {ObjectID}=require('mongodb');

var {mongoose} =require('./db/mongoose');
var {Todo}=require("./models/todo");
var {User}=require("./models/user");
var {authenticate}=require('./middleware/authenticate');

var app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());


app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
      res.send({todos});
    },(e)=>{
      res.status(400).send(e);
    });
});

//Add todos by POST method

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

//Get todos by Id

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

//Delete todos by ID

app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e)=>{
    return res.status(400).send({});
  })
});

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,["text","completed"]);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
if(_.isBoolean(body.completed) && body.completed){
  body.completedAt=new Date().getTime();
}else{
  body.completed=false;
  body.completedAt=null;
}

Todo.findByIdAndUpdate(id,{$set: body},{new :true}).then((todo)=>{
  if(!todo){
    return res.status(404).send();
  }
res.send({todo});

}).catch((e)=>{
  res.status(400).send();
});
});

//instance method will be called on individual user 
// Model method will be called on User model

//user.generateAuthToken
//User.findByToken
app.post('/users',(req,res)=>{
  var body=_.pick(req.body,["email","password"]);
  var user=new User(body);

   user.save().then(()=>{
   return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user)
  }).catch((error)=>{
    res.status(400).send(error);
  })
  });



  
app.get('/users/login',authenticate,(req,res)=>{

    res.send(req.user);
  
});

app.post('/users/login',(req,res)=>{
  var body=_.pick(req.body,["email","password"]);

  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
    res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
    res.status(401).send({'error':'Invalid Credentials'});
  })
})



app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});

module.exports={app};





