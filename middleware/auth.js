
const jwt = require('jsonwebtoken');

exports.verifyTokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET || 'yourFallbackSecretKey', (err, user) => {
        if (err) {
          return res.status(403).json({ success: false, message: "Token is not valid" });
        }

  
        req.user = user;
        next(); 
      });
    } else {
      res.status(401).json({ success: false, message: "Authentication header not provided (Token)" });
    }
  } catch (error) {
    next(error);
  }
};
