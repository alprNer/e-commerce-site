import { useContext } from "react";
import ProductCard from "../Product Card/ProductCard";
import MyContext from "../../context/myContext";

function HomeProductCard() {
  const context = useContext(MyContext);

  const { product } = context;

  const firstFourObjects = product.slice(0, 4);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Enn yeni koleksiyonumuz
          </h1>
          <div className="h-1 w-20 bg-violet-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {firstFourObjects.map((item, i) => {
            return (
              <ProductCard key={i} item={item}/>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeProductCard;
