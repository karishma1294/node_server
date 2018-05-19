const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const _=require("lodash");

var UserSchema=new mongoose.Schema({
  email :{
    type: String,
    unique: true,
    minlength: 1,
    trim: true,
    required: [true,'User email id is required'],
    validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid phone number!'
        }
    },
    password :{
      type:String,
      require:true,
      minlength:6
    },
    tokens:[{
      access: {
        type: String,
        required: true
      },
      token:{
        type:String,
        required: true
      }
    }]
  });

  UserSchema.methods.toJSON=function(){
    var user=this;
    var userObj=user.toObject();
    return _.pick(userObj,['_id','email']);
  }
//instance methods access to individual model
//we need 'this' keyword for this function

UserSchema.methods.generateAuthToken=function(){
  var user=this;
  var access='auth';
  // var secret='123abc';
  var token=jwt.sign({_id:user._id.toHexString(),access},'123abc').toString();

  user.tokens=user.tokens.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  });
}
//Model method
UserSchema.statics.findByToken=function(token){
var User=this;
var decoded;
try{
 decoded=jwt.verify(token,'123abc');
}catch(e){
return Promise.reject();
}
return User.findOne({
  '_id':decoded._id,
  'tokens.token':token,
  'tokens.access':'auth'
})

}
var User=mongoose.model('User',UserSchema);



module.exports={User};
