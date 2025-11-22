import jwt from "jsonwebtoken";

// seller login: /api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        };
      res.status(200).json({ message: "Login Successful", success: true });
    }
  } catch (error) {
    console.error("Error in Seller-Login",error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// seller logout: /api/seller/logout

export const sellerLogout = async (req, res) =>{
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        });

        return res
        .status(200)
        .json({
            message: "Logged out successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// check Auth Seller: /api/seller/is-auth

export const isAuthSeller = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
        })

    } catch (error) {
         console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}