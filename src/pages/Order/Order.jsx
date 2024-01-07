import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useContext } from "react";
import MyContext from "../../context/myContext";

function Order() {
  const params = useParams();
  const { id } = params;

  const context = useContext(MyContext);
  const { myOrders } = context;

  const order = myOrders.filter((data) => data.orderId == id);
  const objOrder = order[0];

  return (
    <Layout>
      <div className="h-auto bg-gray-100 pt-5">
        <h2 className="mb-10 text-center text-2xl font-bold">Order: {id}</h2>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pb-36">
          <div className="rounded-lg md:w-2/3">
            {order &&
              objOrder &&
              objOrder.cartItems.map((item, i) => (
                <div
                  key={i}
                  className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                >
                  <img
                    src={item.imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="text-sm  text-gray-900">
                        {item.description}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        ₺{item.price}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between items-center">
              <p className="text-gray-700">Order ID :</p>
              <p className="text-gray-700">{objOrder && objOrder.orderId}</p>
            </div>
            <div className="mb-2 flex justify-between items-center">
              <p className="text-gray-700">Payment ID :</p>
              <p className="text-gray-700">{objOrder && objOrder.paymentId}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700">Purchased Date :</p>
              <p className="text-gray-700 text-sm">
                {objOrder && objOrder.date}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold">
                  ₺{objOrder && objOrder.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Order;
