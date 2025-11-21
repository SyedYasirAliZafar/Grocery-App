import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ 
                message: "Please login first", 
                success: false 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store full decoded payload
        req.user = decoded;

        next();  
    } catch (error) {
        console.error("Authentication Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};
