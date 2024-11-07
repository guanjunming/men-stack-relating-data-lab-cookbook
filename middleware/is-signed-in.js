const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Not authorised" });
    }
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
};

module.exports = isSignedIn;
