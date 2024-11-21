import { useCallback, useEffect, useState } from "react";
import { ItemProps, Product } from "../types";
import axios from "axios";
import ProductItem from "./productItem";
import Search from "./Search";
import useProduct from "../hooks/useProduct";
const ProductContainer = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const limit = 3;
  const { isLoading, products, setIsLoading, getProducts, getMoreProducts } =
    useProduct();

  const handleScroll = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setIsLoading(true);
      getMoreProducts(limit, page * limit);
      setPage(page + 1);
    }
  }, [isLoading]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    getProducts(limit);
  }, []);
  console.log(products);
  return (
    <div className="py-5">
      <Search />
      <>
        {products &&
          products.map((product) => (
            <ProductItem
              key={product.id}
              title={product.title}
              thumbnail={product.thumbnail}
              description={product.description}
              price={product.price}
              discountPercentage={product.discountPercentage}
            />
          ))}
        {isLoading && <div className="mx-5 font-semibold my-2">Loading...</div>}
      </>
    </div>
  );
};
export default ProductContainer;
