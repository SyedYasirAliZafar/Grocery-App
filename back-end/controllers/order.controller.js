import {Order} from '../models/order.model.js'
import {Product} from '../models/product.model.js'

// Place order COD: /api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user.id;  // fixed

        const { items, address } = req.body;
        if (!items || !address) {
            return res.status(400).json({ message: "Items and Address are required", success: false });
        }

        // calculate total amount
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}`, success: false });
            }
            amount += product.offerPrice * item.quantity;
        }

        // add 2% tax
        amount += Math.floor((amount * 2) / 100);

        await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "COD",
            isPaid: false,
        });

        res.status(201).json({
            message: "Order Placed Successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};


// order details for individual user :/api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user
        const orders = await Order.find({
            userId,
           $or:[{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address")
        .sort({createdAt: -1})
        res.status(200).json({
            success: true,
            orders,
        })

    } catch (error) {
        console.error("Error fetching user orders:" ,error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

// get all orders for admin :/api/order/seller

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product address")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
