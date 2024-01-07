import { useContext } from "react";
import Layout from "../../../components/Layout";
import ProductCard from "../../../components/Product Card/ProductCard";
import MyContext from "../../../context/myContext";
import Filter from "../../../components/HeroSection/Fiilter";

export default function AllItems() {
  const context = useContext(MyContext);
  const { product, searchkey, filterType } = context;

  // Check if any filters are applied
  const filtersApplied = (searchkey || filterType) != "";

  // Filter the products based on the applied criteria or show all products if no filters are applied
  const filteredProducts = product.filter((product) => {
    const titleMatch =
      !searchkey ||
      product.title.toLowerCase().includes(searchkey.toLowerCase());
    const categoryMatch =
      !filterType ||
      product.category.toLowerCase() === filterType.toLowerCase();
    return titleMatch && categoryMatch;
  });

  return (
    <Layout>
      <div className="pt-6">
        <Filter />
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filtersApplied
              ? filteredProducts.map((item, i) => {
                  return <ProductCard key={i} item={item} />;
                })
              : // Show all products if no filters are applied
                product.map((item, i) => {
                  return <ProductCard key={i} item={item} />;
                })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
