import { useContext } from "react";
import MyContext from "../../context/myContext";

export default function UpdateModal() {
  const context = useContext(MyContext);

  const { products, setProducts, updateProduct } = context;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProducts((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl space-y-4 md:space-y-6">
          <div className="">
            <input
              type="text"
              name="title"
              value={products.title}
              onChange={handleOnChange}
              className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
              placeholder="Product title"
            />
          </div>
          <div className="">
            <input
              type="text"
              name="brand"
              value={products.brand}
              onChange={handleOnChange}
              className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              value={products.price}
              onChange={handleOnChange}
              className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              type="text"
              name="imageurl"
              value={products.imageUrl}
              onChange={handleOnChange}
              className="  border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              name="category"
              value={products.category}
              onChange={handleOnChange}
              className="  border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="4"
              name="description"
              value={products.description}
              onChange={handleOnChange}
              className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
              placeholder="Product Description"
            ></textarea>
          </div>
          <button
            className="bg-violet-800 p-2  rounded-lg  text-white my-5 mx-auto"
            onClick={() => updateProduct()}
          >
            Güncelle
          </button>
        </div>
      </div>
    </>
  );
}
