import { NavLink, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useContext } from "react";
import MyContext from "../../context/myContext";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

export default function Orders() {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const { myOrders } = context;

  return (
    <Layout>
      <div className="h-auto bg-gray-100 pt-5">
        <h1 className="mb-10 text-center text-2xl font-bold">My Orders</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pb-36">
          <div className="rounded-lg">
            <div className="">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Payment ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders && myOrders.length > 0 ? (
                      myOrders.map((item, i) => (
                        <tr
                          key={i}
                          className="bg-gray-50 border-b dark:border-gray-700"
                        >
                          <td className="px-6 py-4 text-black ">{i + 1}</td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap"
                          >
                            {item.orderId}
                          </th>
                          <td className="px-6 py-4 text-black ">
                            {item.paymentId}
                          </td>
                          <td className="px-6 py-4 text-black ">
                            {item.email}
                          </td>
                          <td className="px-6 py-4 text-black ">{item.date}</td>
                          <td className="px-6 py-4 text-black ">
                            <button
                              className="flex mx-auto mt-3 text-white bg-violet-700 border-0 py-1 px-8 focus:outline-none hover:bg-violet-600 rounded text-sm duration-150 disabled:bg-violet-400 disabled:cursor-not-allowed"
                              onClick={() => navigate(`/order/${item.orderId}`)}
                            >
                              View Order
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 text-black">
                          Sepetiniz boş.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
