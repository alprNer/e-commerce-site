import Layout from "../../../components/Layout";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import DashboardTab from "./DashboardTabs";
import { AiFillShopping } from "react-icons/ai";
import { useContext } from "react";
import MyContext from "../../../context/myContext";

function Dashboard() {
  const context = useContext(MyContext);

  const { product, orders } = context;

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center mt-10">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className=" border-2 hover:shadow-purple-600 bg-gray-100 border-gray-300    px-4 py-3 rounded-xl">
                <div className="text-purple-500 h-12 text-4xl flex items-center justify-center mb-3">
                  <MdProductionQuantityLimits />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1">
                  {product && product.length}
                </h2>
                <p className=" text-purple-500  font-bold">Total Products</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className=" border-2 hover:shadow-purple-600 bg-gray-100 border-gray-300    px-4 py-3 rounded-xl">
                <div className="text-purple-500 h-12 text-4xl flex items-center justify-center mb-3">
                  <AiFillShopping />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1">
                  {orders.length}
                </h2>
                <p className=" text-purple-500  font-bold">Total Orders</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className=" border-2 hover:shadow-purple-600 bg-gray-100 border-gray-300    px-4 py-3 rounded-xl">
                <div className="text-purple-500 h-12 text-4xl flex items-center justify-center mb-3">
                  <FaRegUser />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1">
                  20
                </h2>
                <p className=" text-purple-500  font-bold">Toplam Kullanıcı</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className=" border-2 hover:shadow-purple-600 bg-gray-100 border-gray-300    px-4 py-3 rounded-xl">
                <div className="text-purple-500 h-12 text-4xl flex items-center justify-center mb-3">
                  <MdProductionQuantityLimits />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1">
                  20
                </h2>
                <p className=" text-purple-500  font-bold">Toplam Ürünler</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DashboardTab />
    </Layout>
  );
}

export default Dashboard;
