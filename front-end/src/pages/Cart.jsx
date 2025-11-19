import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";

const Cart = () => {
  const {
    products,
    navigate,
    cartItems,
    removeFromCart,
    updateCartItem,
    totalCartAmount,
    cartCount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState(dummyAddress);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  // ✅ FIXED getCart()
  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0) {
      getCart();
    }
  }, [products, cartItems]);

  return products.length > 0 && cartArray.length > 0 ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {cartCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* 🔥 FIXED — Now using cartArray.map() */}
        {cartArray.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-600 text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => navigate(`/product/${item.category}/${item._id}`)}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div>
                <p className="hidden md:block font-semibold">{item.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Qty:{" "}
                    <select
                      className="outline-none ml-2"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItem(item._id, Number(e.target.value))
                      }
                    >
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </select>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center">
              ${item.offerPrice * item.quantity}
            </p>

            {/* 🔥 FIXED Remove button */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="cursor-pointer mx-auto"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          Continue Shopping
        </button>
      </div>

      {/* --------- RIGHT SIDE SUMMARY --------- */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="text-gray-500 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${totalCartAmount()}</span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${(totalCartAmount() * 0.02).toFixed(2)}</span>
          </p>

          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${(totalCartAmount() * 1.02).toFixed(2)}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
          Place Order
        </button>
      </div>
    </div>
  ) : (
    <p className="text-center py-20 text-gray-500 text-xl">
      Your Cart is Empty.
    </p>
  );
};

export default Cart;
