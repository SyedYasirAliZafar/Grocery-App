import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();

  // find product
  const product = products.find((p) => p._id === id);

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="max-w-6xl w-full px-6 mt-15">
      {/* Breadcrumb */}
      <p className="text-gray-600 text-sm">
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {" "}
          {product.category}
        </Link>{" "}
        / <span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Left Side Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-300 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt={`thumb-${index}`} />
              </div>
            ))}
          </div>

          {/* Large Thumbnail */}
          <div className="border border-gray-300 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < product.rating ? assets.star_icon : assets.star_dull_icon}
                  className="w-4"
                  alt="star"
                />
              ))}
            <p className="text-base ml-2 text-gray-600">
              ({product.rating})
            </p>
          </div>

          {/* Prices */}
          <div className="mt-6">
            <p className="text-gray-500 line-through">
              MRP: ${product.price}
            </p>
            <p className="text-2xl font-medium">
              Price: ${product.offerPrice}
            </p>
            <span className="text-gray-500">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-600">
            {product.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 rounded transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
