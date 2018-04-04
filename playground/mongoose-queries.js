const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
// var id="5ac4f98e29c25928264c2e4011";
// if(!ObjectID.isValid(id)){
//   console.log("id not valid");
// }
//
//
// // var id="6ac4f98e29c25928264c2e40";
//
// // Todo.find({
// //   _id :id
// // }).then((todos)=>{
// //   console.log('Todos',todos);
// // });
// //
// // Todo.findOne({
// //   _id :id
// // }).then((todo)=>{
// //   console.log('Todos',todo);
// // });
//
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log("Id not found");
//   }
//   console.log('Todo By ID',todo);
// }).catch((e)=>{
//   console.log(e);
// })


var id="5ac27b47044c07001e2139a8";


User.findById(id).then((todo)=>{
  if(!todo){
    return console.log("ID Not found");
  }
  console.log("ID found",todo);
}).catch((e)=>{
  console.log(e);
})
