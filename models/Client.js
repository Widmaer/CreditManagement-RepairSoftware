var mongoose = require('mongoose')
var Schema=mongoose.Schema

var clientSchema = new Schema({
  name:{type:String,required:true},
  description:{type:String},
  startDate:{type:String,required:true},
  program:{type:String,required:true},
  Agent:{type:String,required:true},
  contactInfo:{
    email:{type:String},
    phoneNo:{type:String}
  },
  status:{type:String},
  progress:{type:Number},
  user:{type:Schema.Types.ObjectId,ref:'User'},
})

module.exports = mongoose.model('Client',clientSchema);
