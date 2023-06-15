const jwt = require("jsonwebtoken");
async function authenticateJWT (req, res, next)  {
  try {
    const accessToken = req.headers.authorization;

    if (accessToken) {
      const usertoken = await accessToken.split(" ")[1];
      const token = jwt.verify(
        usertoken,
        accessTokenSecret
      );
      req.tokenData = token;
      next();
    }
  } catch (err) {
    return res.status(404).send({ message: "Please try with different token" });
  }
};
module.exports = {
  authenticateJWT,
};
