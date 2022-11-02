const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true },
  questionNumber:{ type:Number,required:true,unique:true },
  answer: { type: String, required: true },
  example:{type: String, required: true },
  topic: { type: String, required: true },
  topicId: { type: Schema.Types.ObjectId, required: true, ref: "Topic" },
});

questionSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Question", questionSchema);
