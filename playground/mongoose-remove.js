const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
var id="5ac5317d7826dc2e8cefd150";

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

Todo.findOneAndRemove({_id: "5ac5317d7826dc2e8cefd150"}).then((todo)=>{

});
Todo.findByIdAndRemove(id).then((todo)=>{
console.log(todo);
});
