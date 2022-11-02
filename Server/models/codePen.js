const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const codePenSchema=new Schema({
   html:{type:String},
   css:{type:String},
   js:{type:String},
   srcDoc:{type:String},
   userId:{type:String ,ref:'User'}
})

module.exports=mongoose.model('CodePenSrcDoc',codePenSchema);