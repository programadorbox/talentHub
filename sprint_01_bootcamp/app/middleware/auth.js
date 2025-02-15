const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");
 
exports.verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.userId = decoded.id;
        next();
    });
};