import { useContext } from "react";
import Layout from "../../../components/Layout";
import ProductCard from "../../../components/Product Card/ProductCard";
import MyContext from "../../../context/myContext";
import FilterOne from "../../../components/HeroSection/FilterOne";

export default function MobilesAndTablets() {
  const context = useContext(MyContext);
  const { product, searchkey } = context;
  const eleProduct = product.filter((item) => item.category == "Mobiles");
  // Check if any filters are applied
  const filtersApplied = searchkey != "";

  // Filter the products based on the applied criteria or show all products if no filters are applied
  const filteredProducts = eleProduct.filter((product) => {
    const titleMatch =
      !searchkey ||
      product.title.toLowerCase().includes(searchkey.toLowerCase());
    return titleMatch;
  });

  return (
    <Layout>
      <div className="pt-6">
        <FilterOne />
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filtersApplied
              ? filteredProducts.map((item, i) => {
                  return <ProductCard key={i} item={item} />;
                })
              : // Show all products if no filters are applied
                eleProduct.map((item, i) => {
                  return <ProductCard key={i} item={item} />;
                })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
