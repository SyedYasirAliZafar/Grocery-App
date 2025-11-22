import { User } from '../models/user.model.js';

export const updateCart = async (req, res) => {
    try {
        const userId = req.user;
        const { cartItems } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { cartData: cartItems },
            { new: true }
        );

        // ❌ If user not found
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // ✅ User found → send success response
        return res.status(200).json({
            updatedUser,
            success: true,
            message: "Cart Updated Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};
