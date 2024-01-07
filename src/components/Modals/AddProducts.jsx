import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa6";
import MyContext from "../../context/myContext";
import { toast } from "react-toastify";

export default function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");
  const context = useContext(MyContext);

  const { products, setProducts, addProduct } = context;

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProducts((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const show = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="flat"
          onPress={() => handleOpen("blur")}
          className="capitalize bg-violet-700 text-white"
        >
          <FaCartPlus size={20} /> Add Products
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center text-center">
                Add Product
              </ModalHeader>
              <ModalBody>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <input
                      type="text"
                      name="title"
                      id="Product title"
                      value={products.title}
                      onChange={handleOnChange}
                      placeholder="Product title"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="brand"
                      id="Product brand"
                      value={products.brand}
                      onChange={handleOnChange}
                      placeholder="Product brand"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="Product price"
                      value={products.price}
                      onChange={handleOnChange}
                      placeholder="Product Price"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="imageUrl"
                      id="Product imageUrl"
                      value={products.imageUrl}
                      onChange={handleOnChange}
                      placeholder="Product imageUrl"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={products.category}
                      onChange={handleOnChange}
                      placeholder="Product category"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      value={products.description}
                      onChange={handleOnChange}
                      placeholder="Product Description"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                      rows="2"
                    ></textarea>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="
                  bg-violet-700 text-white"
                  onClick={show}
                >
                  Add Product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
