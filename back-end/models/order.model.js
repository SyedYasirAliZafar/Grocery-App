import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Address"
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    paymentType: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
