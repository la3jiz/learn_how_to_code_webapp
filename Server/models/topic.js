const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
  topic: { type: String, required: true },
  questions:[{type:Schema.Types.ObjectId,required:true ,Ref:'Question'}]
});

module.exports = mongoose.model("Topic", topicSchema);
