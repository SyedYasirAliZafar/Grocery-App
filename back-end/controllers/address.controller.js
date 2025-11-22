import { Address } from '../models/address.model.js';

// add address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        const userId = req.user;
        const { address } = req.body;

        if (!address || Object.keys(address).length === 0) {
            return res.status(400).json({
                message: "Address data is required",
                success: false
            });
        }

        await Address.create({
            ...address,
            userId,
        });

        res.status(201).json({
            message: "Address added successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error adding Address:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// get addresses : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.user;
        const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            addresses,
        });

    } catch (error) {
        console.error("Error getting Address:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
