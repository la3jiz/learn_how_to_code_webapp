const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];
    if (!token) {
        throw new Error("not authorized")
    }
    const decodedToken=jwt.verify(token,process.env.TOKEN_SECRET_KEY)
    req.user=decodedToken
    next()
  } catch (err) {
      if(!err.statusCode){
          err.statusCode=500
      }
      next(err)
  }
};
