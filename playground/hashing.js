const {SHA256}=require('crypto-js');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password="hello1!";

// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(err,hash)=>{
//     console.log(hash);
//   });

  var hashedPasword='$2a$10$d0mmDZ3NGXxyH2BRvB6XPOEhTNxVLR4qyUZgxXPXSy/25WY4Z5OGS';

  bcrypt.compare('password',hashedPasword,(err,success)=>{
    console.log(success);
  });












// var data={
//   id:5
// }

// var token= jwt.sign(data,"123abc");
// console.log(token);

// var decoded=jwt.verify(token,"123abc");

// console.log('decoded variable',decoded);


// var message='I am karishma';
//
// var hash=SHA256(message).toString();
// console.log(`Message : ${message}`);
// console.log(`HashMessage : ${hash}`);
//
//   var data={
//     id:4
//   };
//
//   var token={
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
//   }
//
//   token.data.id=5;
//   token.hash=SHA256(JSON.stringify(data)).toString();
//
//
//   var resultHash=SHA256(JSON.stringify(token.data)+ 'somesecret').toString();
//
//   if(resultHash===token.hash){
//     console.log("Data is authorised");
//   }else{
//     console.log("Donot trust");
//   }







