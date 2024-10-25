exports.verifySignUp = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Email and password are required" });
    }
    next();
};