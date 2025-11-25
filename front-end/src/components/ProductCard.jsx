import React from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { navigate, addToCart, cartItems, removeFromCart } = useAppContext();

  const itemCount = cartItems?.[product._id] || 0;

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
        }}
        className="border border-gray-500/20 rounded-md px-4 py-3 bg-white 
             w-full sm:w-56 md:w-56 mb-10 cursor-pointer 
             hover:shadow-md transition"
      >
        {/* Image */}
        <div className="group flex items-center justify-center px-2 h-40 overflow-hidden">
          <img
            className="group-hover:scale-105 transition duration-300 object-contain h-full"
            src={`http://localhost:3000/images/${product.image[0]}`}
            alt={product.name}
          />
        </div>

        {/* Details */}
        <div className="text-gray-500/60 text-sm mt-2">
          <p className="capitalize">{product.category}</p>

          <p className="text-gray-700 font-medium text-lg truncate">
            {product.name}
          </p>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-3 md:w-3.5"
                />
              ))}
            <p className="ml-1">(4)</p>
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-indigo-500">
              ${product.offerPrice}
              <span className="text-gray-500/60 text-xs md:text-sm line-through ml-1">
                ${product.price}
              </span>
            </p>

            {/* Add / Counter */}
            <div className="text-indigo-500">
              {!itemCount ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id);
                  }}
                  className="flex items-center justify-center gap-1 bg-indigo-100 
           border border-indigo-300 w-[70px] h-[34px] rounded 
           text-indigo-600 font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.74l.93-4.89H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                      stroke="#615fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add
                </button>
              ) : (
                <div
                  className="flex items-center justify-center gap-2 w-20 h-[34px] 
           bg-indigo-500/25 rounded select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(product._id);
                    }}
                    className="cursor-pointer text-md px-2"
                  >
                    -
                  </button>

                  <span className="w-5 text-center">{itemCount}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product._id);
                    }}
                    className="cursor-pointer text-md px-2"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
