import { useContext } from "react";
import Layout from "../../../components/Layout";
import ProductCard from "../../../components/Product Card/ProductCard";
import MyContext from "../../../context/myContext";
import FilterOne from "../../../components/HeroSection/FilterOne";

export default function Electronics() {
  const context = useContext(MyContext);
  const { product, searchkey } = context;
  const eleProduct = product.filter((item) => item.category == "Electronics");
  
  const filtersApplied = searchkey != "";

 
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
              : 
                eleProduct.map((item, i) => {
                  return <ProductCard key={i} item={item} />;
                })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
