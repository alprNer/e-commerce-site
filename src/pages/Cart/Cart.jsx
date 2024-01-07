import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const {
    subTotal,
    total,
    shippingFees,
    decreaseQuantity,
    updatePrice,
    increaseQuantity,
    deleteCart,
  } = context;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      <div className="h-auto bg-gray-100 pt-5">
        <h1 className="mb-10 text-center text-2xl font-bold">Sepetim</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pb-36">
          <div className="rounded-lg md:w-2/3">
            {cartItems.length > 0 ? (
              cartItems.map((product, i) => {
                return (
                  <div
                    key={i}
                    className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                  >
                    <img
                      src={product.imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.title}
                        </h2>
                        <h2 className="text-sm  text-gray-900">
                          {product.description}
                        </h2>
                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          ₺{product.price}
                        </p>
                        <div className="flex mt-2">
                          <button
                            className="bg-red-700 p-2 text-lg font-bold rounded-l-md"
                            onClick={() => decreaseQuantity(product)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={product.quantity}
                            disabled
                            className="w-10 text-center border-2"
                          />
                          {updatePrice(product)}
                          <button
                            className="bg-green-700 px-2 py-1 text-md font-bold rounded-r-md"
                            onClick={() => increaseQuantity(product)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div
                        className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 cursor-pointer"
                        onClick={() => deleteCart(product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2} 
                          stroke="red" 
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>  
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h5>Sepetiniz boş ...</h5>
            )}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Ürün</p>
              <p className="text-gray-700">₺{subTotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-red-700">Kargo Ücreti</p>
              <p className="text-red-700">₺{shippingFees}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Toplam</p>
              <div className>
                <p className="mb-1 text-lg font-bold">₺{total}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              disabled={total <= 0 ? true : false}
              className="bg-gray-600 hover:bg-violet-700 disabled:bg-violet-400 disabled:cursor-not-allowed duration-150 text-white p-2 text-md rounded-md"
            >
              Satın Al
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
