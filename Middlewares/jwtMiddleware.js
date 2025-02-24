const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json("Authorization header missing or malformed!");
        }

        const token = authHeader.split(" ")[1]

        const data = jwt.verify(token, process.env.SECRET_KEY)

        if (data) {
            const { userId } = data;
            req.payload = userId;
            next();
        } else {
            res.status(401).json("Invalid Token!")
        }
    } catch (error) {
        console.log("Token verification error:", error.message);
        res.status(401).json("Token verification failed!");
    }
}

module.exports = jwtMiddleware