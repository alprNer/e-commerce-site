/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { fireDB } from "../firebase/FirebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  updateQuantity,
  updateTotal,
} from "../redux/slices/cartSlice";

function MyState(props) {
  const dispatch = useDispatch();
  // creating product
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    brand: "",
    description: "",
    createdAt: new Date().toLocaleString("en-IN"),
  });

  const addProduct = async () => {
    if (
      !products.title ||
      !products.price ||
      !products.imageUrl ||
      !products.category ||
      !products.brand ||
      !products.description
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully");
      getProductData();
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.log(error);
    }
    setProducts("");
  };

  const [product, setProduct] = useState([]);

  // Get product
  const getProductData = async () => {
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("createdAt", 'desc')

        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  const edithandle = (item) => {
    setProducts(item);
  };
  // update product
  const updateProduct = async () => {
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      getProductData();
    } catch (error) {
      // toast.success('Product Deleted Falied')
    }
  };

  const [orders, setOrder] = useState([]);

  const getOrderData = async () => {
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const orderArray = [];
      result.forEach((doc) => {
        orderArray.push(doc.data());
      });
      setOrder(orderArray);
    } catch (error) {
      console.log(error);
    }
  };

  const userid = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).user.uid
    : "";
  const myOrders =
    orders.length > 0 ? orders.filter((obj) => obj.userid == userid) : [];

  useEffect(() => {
    getProductData();
    getOrderData();
  }, []);

  const cartItems = useSelector((state) => state.cart);
  const shippingFees = 50;

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));

    let subTotalAmount = 0;

    for (const product of cartItems) {
      subTotalAmount += product.price * product.quantity;
    }

    const totalAmount = subTotalAmount + shippingFees;
    setSubTotal(subTotalAmount);
    setTotal(totalAmount);

    if (cartItems.length <= 0) {
      setTotal(0);
    }
  }, [cartItems]);

  const deleteCart = (product) => {
    dispatch(deleteFromCart(product));
  };

  const updatePrice = (product) => {
    dispatch(
      updateTotal({
        productId: product.id,
        totalPrice: total,
      })
    );
  };

  const increaseQuantity = (product) => {
    dispatch(
      updateQuantity({ productId: product.id, quantity: product.quantity + 1 })
    );
  };

  const decreaseQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(
        updateQuantity({
          productId: product.id,
          quantity: product.quantity - 1,
        })
      );
    }
  };

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");

  return (
    <MyContext.Provider
      value={{
        product,
        products,
        setProducts,
        addProduct,
        edithandle,
        deleteProduct,
        updateProduct,
        subTotal,
        total,
        shippingFees,
        increaseQuantity,
        decreaseQuantity,
        updatePrice,
        deleteCart,
        orders,
        myOrders,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
