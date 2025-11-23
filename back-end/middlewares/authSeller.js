import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
    try {
        // Access token correctly from cookies
        const sellerToken = req.cookies?.sellerToken;

        if (!sellerToken) {
            return res.status(401).json({ 
                message: "Unauthorized, token missing", 
                success: false 
            });
        }

        // Verify JWT
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        // Optional: check email or other claims
        if (decoded.email !== process.env.SELLER_EMAIL) {
            return res.status(403).json({
                message: "Unauthorized seller",
                success: false
            });
        }

        // Attach seller info to request if needed
        req.seller = decoded;

        next(); // token valid → proceed
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};
