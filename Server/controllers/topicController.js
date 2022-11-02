const Topic = require("../models/topic");
const Question = require("../models/question")

exports.saveTopic = async (req, res, next) => {

  let topic;
  try {
    topic = await Topic.findOne({ topic: req.body.topicTitle })
    if (topic) {
      const error = new Error("existing topic");
      error.statusCode = 406;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }

  const newTopic = new Topic({ topic: req.body.topicTitle, questions: [] });
  const createdTopic = await newTopic.save();
  return res.status(200).json({ createdTopic })
}

exports.getTopics = async (req, res, next) => {
  let topics;
  try {
    topics = await Topic.find();
    if (!topics) {
      const error = new Error("theres no topics for now !!");
      error.statusCode = 404;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
  return res.status(200).json({ topics });
};

exports.findQuestionByTopic = async (req, res, next) => {
  let topic;
  let question;
  const questionNbr = req.query.questionNbr;
  try {
    topic = await Topic.findOne({ topic: req.query.topic.toUpperCase() })
    if (topic.questions.length === 0) {
      const error = new Error("sorry there is no questions for this topic");
      error.message="sorry there is no questions for this topic"
      error.statusCode = 500;
      return next(error)
    }


    question = await Question.findOne({ questionNumber: questionNbr, topic: req.query.topic.toUpperCase() })
    if (!question) {
      const error = new Error("question not found verify your data")
      error.statusCode = 500
      return next(error)
    }
  } catch (err) {
    if (!err.statusCode)
      err.statusCode = 404;
   return next(err);
  }


  return res.status(200).json({ question })

}

