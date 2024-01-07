/* eslint-disable react/prop-types */
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mt-14 lg:mt-20">{children}</div>
      <Footer />
    </>
  );
}
