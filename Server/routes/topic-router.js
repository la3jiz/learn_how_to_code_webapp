const express=require('express')

const topicController=require('../controllers/topicController')

const router=express.Router()

//router.get("/",topicController.getTopics)
//router.post("/save",topicController.saveTopic)
router.get("/questions",topicController.findQuestionByTopic)

module.exports=router