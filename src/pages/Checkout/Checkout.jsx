
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import pincodeData from "../../assets/pincodes.json";
import { useSelector } from "react-redux";
import MyContext from "../../context/myContext";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const context = useContext(MyContext);
  const { total, shippingFees, deleteCart } = context;

  function generateOrderID() {
    const timestamp = Date.now(); 
    const randomNum = Math.floor(Math.random() * 10000); 

    
    const orderID = `${timestamp}${randomNum}`;

    return orderID;
  }

  const [formData, setFormData] = useState({
    pincode: "",
    taluka: "",
    dist: "",
    state: "",
    name: "",
    email: "",
    city: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = () => {
    const inputPincode = formData.pincode;
    const location = pincodeData.find(
      (item) => item.pincode === parseInt(inputPincode, 10)
    );
    if (location) {
      setFormData({
        ...formData,
        city: location.officeName,
        taluka: location.taluk,
        dist: location.districtName,
        state: location.stateName,
      });
    } else {
      // Pin Code is not available, clear the previous values
      setFormData({
        ...formData,
        taluka: "",
        dist: "",
        state: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.city == "" ||
      formData.pincode == "" ||
      formData.taluka == "" ||
      formData.dist === " || formData.state===" ||
      formData.mobileNumber === ""
    ) {
      return toast.error("All fields are required", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (formData.mobileNumber.length < 10) {
      return toast.error("Invalid Mobile Number", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const orderId = generateOrderID();
    const addressInfo = {
      name: formData.name,
      email: formData.email,
      pincode: formData.pincode,
      mobileNumber: formData.mobileNumber,
      fullAddress: `City: ${formData.city},Taluka: ${formData.taluka},Dist: ${formData.dist},State: ${formData.state}`,
      createdAt: new Date().toLocaleString("en-IN"),
    };

    console.log(addressInfo);

    var options = {
      key: import.meta.env.VITE_RZP_KEY,
      key_secret: import.meta.env.VITE_RZP_KEY_SECRET,
      amount: parseInt(total * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "E-Bharat",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        toast.success("Payment Successful");
        window.location.href = "/orders";

        const paymentId = response.razorpay_payment_id;
        const orderInfo = {
          cartItems,
          addressInfo,
          orderId,
          totalAmount: total,
          date: new Date().toLocaleString("en-IN"),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };
        console.log("orderInfo: ", orderInfo);
        try {
          const result = addDoc(collection(fireDB, "orders"), orderInfo);
          localStorage.removeItem("cart");
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      email: JSON.parse(localStorage.getItem("user")).user.email,
    });
  }, [formData.pincode]);
  return (
    <Layout>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <h2 className="text-3xl font-bold text-center my-3 pt-4">Ödeme</h2>
        <h4 className="text-xl font-bold">1. Bilgilerinizi giriniz:</h4>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  Şehir
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength="6"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="taluka"
                  className="leading-7 text-sm text-gray-600"
                >
                  İlçe
                </label>
                <input
                  type="text"
                  id="taluka"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="dist"
                  className="leading-7 text-sm text-gray-600"
                >
                  Mahalle 
                </label>
                <input
                  type="text"
                  id="dist"
                  name="dist"
                  value={formData.dist}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  Sokak
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="mobileNumber"
                  className="leading-7 text-sm text-gray-600"
                >
                  Tel No:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-full">
              <h4 className="text-xl font-bold">2. Sepetiniz:</h4>
              <div className="bg-violet-500 lg:w-full md:w-2/3 mx-auto mt-2">
                <div
                  className="bg-violet-400 border-l-4 border-violet-900 rounded-b text-gray-50 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div className="flex">
                    <div>
                      <ul className="list-decimal ml-3 w-full duration-150">
                        {cartItems.map((item, i) => {
                          return (
                            <li key={i} className="my-3 mb-5">
                              <p className="font-bold"> {item.title} </p>
                              <p>Adet: {item.quantity}</p>

                              <div className="flex items-center justify-between mr-3">
                                <p>
                                  ₺{item.price} + ₺{shippingFees} ={" ₺"}
                                  {Number(item.price) +
                                    Number(shippingFees)} x {item.quantity}=
                                  {" ₺"}
                                  {(Number(item.price) + Number(shippingFees)) *
                                    Number(item.quantity)}
                                </p>
                                <AiOutlineDelete
                                  className="cursor-pointer hover:scale-110 duration-150"
                                  size={18}
                                  onClick={() => deleteCart(item)}
                                />
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="flex mx-auto mt-5 text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg duration-150 disabled:bg-violet-400 disabled:cursor-not-allowed"
                disabled={total <= 0}
              >
                Öde- ₺{total}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Checkout;
