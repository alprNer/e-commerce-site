import Layout from "../../components/Layout";
import HeroSection from "../../components/HeroSection/HeroSection";
import Features from "../../components/HeroSection/Features";
import "react-toastify/dist/ReactToastify.css";
import HomeProductCard from "../../components/HeroSection/ProductCards";

export default function Home() {
  // const dispatch = useDispatch();
  // const cartItem = useSelector((state) => state.cart);

  return (
    <Layout>
      <HeroSection />
      <HomeProductCard/>
      <Features />
    </Layout>
  );
}
