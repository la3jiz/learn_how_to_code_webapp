const Question = require("../models/question")
const Topic = require("../models/topic")
const mongoose = require("mongoose")

exports.saveQuestion = async (req, res, next) => {
    try {
        const question = await Question.findOne({ question: req.body.question });
        if (question) {
            const error = new Error("existing question")
            error.statusCode = 406
            throw error
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err)
    }
    const topic = await Topic.findOne({ topic: req.body.topic })
    const questionNumber = topic.questions.length + 1;

    const newQuestion = new Question({ question: req.body.question, questionNumber, answer: req.body.answer,example: req.body.example ,topic: req.body.topic, topicId: mongoose.Types.ObjectId(topic._id) });
    const createdQuestion = await newQuestion.save()

    topic.questions.push(mongoose.Types.ObjectId(createdQuestion._id));
    const updatedTopic = await topic.save();

    return res.status(200).json({ createdQuestion, updatedTopic })
}