import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

export default function OrderModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="flat"
          onPress={() => handleOpen("blur")}
          className="capitalize bg-violet-700 text-white"
        >
          Buy Now
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Enter Your Details
              </ModalHeader>
              <ModalBody>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter Full Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter Full Address
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                      rows="2"
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                      required
                    />
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
                  className="bg-violet-700 text-white"
                >
                  Order Now
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
