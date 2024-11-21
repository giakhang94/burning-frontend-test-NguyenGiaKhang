import { useCallback, useEffect, useRef, useState } from "react";
import { ItemProps, Product } from "../types";
import axios from "axios";
import ProductItem from "./productItem";
import Search from "./Search";
import useProduct from "../hooks/useProduct";
const ProductContainer = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const { isLoading, products, allowLoadMore } = useProduct(page);

  //handle infinite scroll
  const observer = useRef<IntersectionObserver>();
  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries: any) => {
        if (entries[0].isIntersecting && allowLoadMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log("tao", node);
    },
    [isLoading, allowLoadMore]
  );

  //   const handleScroll = useCallback(() => {
  //     const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  //     if (scrollHeight - scrollTop <= clientHeight + 10) {
  //       setIsLoading(true);
  //       getMoreProducts(limit, page * limit);
  //       setPage(page + 1);
  //     }
  //   }, [isLoading]);

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [handleScroll]);

  console.log(products);
  return (
    <div className="py-5">
      <Search />
      <>
        {products &&
          products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <div ref={lastProductRef} key={product.id}>
                  <ProductItem
                    key={product.id}
                    title={product.title}
                    thumbnail={product.thumbnail}
                    description={product.description}
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                </div>
              );
            } else {
              return (
                <ProductItem
                  key={product.id}
                  title={product.title}
                  thumbnail={product.thumbnail}
                  description={product.description}
                  price={product.price}
                  discountPercentage={product.discountPercentage}
                />
              );
            }
          })}
        {isLoading && <div className="mx-5 font-semibold my-2">Loading...</div>}
      </>
    </div>
  );
};
export default ProductContainer;
