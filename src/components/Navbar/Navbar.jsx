import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteFromCart } from "../../redux/slices/cartSlice";

export default function Navbar() {
  const navStyles = {
    liClasses: `hover:-translate-y-0.5 text-lg mx-4 lg:mx-0 hover:underline underline-offset-8 duration-150`,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart);

  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/";
  };

  const deleteCart = (product) => {
    dispatch(deleteFromCart(product));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);
  return (
    <>
      <nav
        className={`bg-white shadow-md -tran border-b-2 z-50 top-0 fixed w-full lg:flex duration-150 text-black flex-wrap justify-between items-center`}>
        {/* logo */}
        <div className="flex items-center justify-between">
          <div className="text-purple-800 font-bold text-2xl mx-3 italic">alprN- STORE</div>


          <div
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
            className="lg:hidden block  text-3xl m-2 active:outline outline-2 rounded-md outline-black"
          >
            <BiMenu />
          </div>
          <div
            className="me-3 text-3xl lg:hidden block"
            onClick={() =>
              isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true)
            }
          >
            <AiOutlineShoppingCart />
          </div>
        </div>

        {/* nav links */}
        <div
          className={`duration-150 mt-4 lg:mt-0 space-x-0 lg:flex items-center h-auto ${
            isOpen ? `h-auto block ` : `h-0 hidden`
          } `}
        >
          <ul
            className={`lg:flex lg:space-y-0 space-y-3 gap-4 justify-center mr-4`}
          >
            <li className={`${navStyles.liClasses}`}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                to="/"
              >
                Ana Sayfa
              </NavLink>
            </li>
            <li className={`${navStyles.liClasses}`}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                to="/fashions"
              >
                Giyim
              </NavLink>
            </li>
            <li className={`${navStyles.liClasses}`}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                to="/electronics"
              >
                Elektronik
              </NavLink>
            </li>
            <li className={`${navStyles.liClasses}`}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                to="/mobile-and-tablets"
              >
                Telefon ve Tablet
              </NavLink>
            </li>
            <li className={`${navStyles.liClasses}`}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                to="/all-items"
              >
                Tümü
              </NavLink>
            </li>
            <li className={`${navStyles.liClasses}`}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                to="/orders"
              >
                Siparişlerim
              </NavLink>
            </li>
            <li className={`${navStyles.liClasses}`}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-semibold" : "")}
                to="/cart"
              >
                Sepetim
              </NavLink>
            </li>
            {user && user.user.email == import.meta.env.VITE_ADMIN_EMAIL ? (
              <li className={`${navStyles.liClasses}`}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : ""
                  }
                  to="/admin/dashboard"
                >
                  Admin
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
          {/* buttons */}
          <div className="lg:flex block items-center gap-3 mr-5 ">
            {user ? (
              <Button
                className="bg-red-800 text-white my-5 mx-1"
                onClick={logout}
              >
                Çıkış yap
              </Button>
            ) : (
              <>
                <Button className="bg-violet-800 text-white my-5 mx-1">
                  <NavLink to="/login">Giriş Yap</NavLink>
                </Button>
                <Button className="bg-violet-800 text-white mx-1">
                  <NavLink to="/signup">Kayıt Ol</NavLink>
                </Button>
              </>
            )}

            {user && (
              <div
                className="me-3 text-3xl lg:flex gap-2 hidden cursor-pointer"
                onClick={() =>
                  isSidebarOpen
                    ? setIsSidebarOpen(false)
                    : setIsSidebarOpen(true)
                }
              >
                <AiOutlineShoppingCart />
                <p className="text-2xl">{cartItem.length}</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      
      <div
        className={`fixed z-50 top-0 right-0 bg-violet-300 h-screen lg:w-80 w-70 ${
          isSidebarOpen ? `w-56 block` : `w-0 hidden`
        }  `}
      >
        <Button className="bg-violet-800 top-3 left-3 text-white mx-1">
          <NavLink to="/cart">Sepete Git</NavLink>
        </Button>
        <div
          className="absolute top-3 duration-150 right-3 text-xl cursor-pointer"
          onClick={() =>
            isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true)
          }
        >
          <AiOutlineCloseCircle />
        </div>
        <div className="mt-12">
          <h4 className="text-2xl font-bold text-center">Sepetim: </h4>
          <ul className="ms-8 list-decimal mb-8">
            {cartItem.length > 0 ? (
              cartItem.map((d, i) => {
                return (
                  <li key={i} className="my-2">
                    {d.title}
                    <div className="flex items-center justify-between mr-3">
                      <p>₺ {d.price}</p>
                      <AiOutlineDelete
                        className="cursor-pointer"
                        size={18}
                        onClick={() => deleteCart(d)}
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <p>Sepetiniz boş...</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
