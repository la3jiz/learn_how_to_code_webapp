const express=require("express")

const codePenController =require('../controllers/codePenController');

const router=express.Router();

router.post('/save-code',codePenController.save);
router.get('/find-code/:userId',codePenController.getUserCodePen);

module.exports=router;