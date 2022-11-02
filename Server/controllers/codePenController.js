const CodePenSrcDoc = require('../models/codePen');
const mongoose = require('mongoose');

exports.save = async (req, res, next) => {
    const userId = req.body.userId
    const html = req.body.html || "";
    const css = req.body.css || "";
    const js = req.body.js || "";
    const srcDoc = req.body.srcDoc || "";

    if (!userId) {
        return
    }
    try {
        const findUserCodePen = await CodePenSrcDoc.findOne({ userId: userId })
        if (findUserCodePen) {
            findUserCodePen.html = html
            findUserCodePen.css = css
            findUserCodePen.js = js
            findUserCodePen.srcDoc = srcDoc
            let updatedCodePen;
            try {
                updatedCodePen = await findUserCodePen.save();
            } catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                return next(err)
            }
            return res.json({ userId, codePenSrcDocId: updatedCodePen._id });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err)
    }

    if (html === "" && css === "" && js === "" && srcDoc === "") {
        return;
    }
    const codePenSrcDoc = new CodePenSrcDoc({ html, css, js, srcDoc,userId: mongoose.Types.ObjectId(userId) });
    let createdCodePenSrcDoc;
    try {
        createdCodePenSrcDoc = await codePenSrcDoc.save();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err)
    }
    return res.json({ userId, codePenSrcDocId: createdCodePenSrcDoc._id });
}

exports.getUserCodePen=async(req,res,next)=>{
const userId=req.params.userId
let findedUserCodePen;
try{
    findedUserCodePen=await CodePenSrcDoc.findOne({userId});
    if(!findedUserCodePen){
        const err=new Error("can't find this project please try later")
        err.statusCode=500
        throw err
    }
    return res.status(200).json({UserCodePen:findedUserCodePen});
}catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    return next(err)
}
}