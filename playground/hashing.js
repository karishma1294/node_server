const {SHA256}=require('crypto-js');

const jwt=require('jsonwebtoken');

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
