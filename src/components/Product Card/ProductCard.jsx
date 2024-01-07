import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ProductCard({ item }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const addCart = (product) => {
    if (window.localStorage.getItem("user")) {
      const alreadyInCart = cartItems.some((item) => item.id === product.id);
      if (alreadyInCart) {
        toast.warning("Already in Cart");
      } else {
        product.quantity = 1;
        dispatch(addToCart(product));
        toast.success("Added to the cart");
      }
    } else {
      return navigate("/login");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="p-4 md:w-1/4">
      <div className="h-full border-2 transition-shadow duration-300 ease-in-out hover:shadow-lg hover:border-gray-300 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
        <div className="flex justify-center cursor-pointer">
          <img
            className="rounded-2xl w-full h-80 p-2 object-contain"
            src={item.imageUrl}
            alt="blog"
          />
        </div>
        <div className="p-5 border-t-2">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {item.brand}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {item.title}
          </h1>
          <p className="leading-relaxed mb-3">₺ {item.price}</p>
          <div className="flex justify-center gap-3 ">
            <button
              type="button"
              className="focus:outline-none text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full duration-200 py-2"
              onClick={() => addCart(item)}
            >
              Sepete ekle
            </button>
            <button
              onClick={() => navigate(`/product/${item.id}`)}
              className="focus:outline-none ring-2 ring-violet-500 text-violet-600 bg-white hover:bg-violet-500 hover:text-white focus:ring-4 focus:ring-purple-300 rounded-lg w-full duration-200"
            >
              İncele
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
