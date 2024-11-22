import { useCallback, useEffect, useRef, useState } from "react";

import useProduct from "./hooks/useProduct";
import { useDebounce } from "../../hooks";
import { ProductItem } from "../../pages/Products/components";
import Search from "../../pages/Products/components/Search";

const InfiniteScroll = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 500);
  const { isLoading, products, allowLoadMore } = useProduct(
    page,
    debounceSearch
  );

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
    },
    [isLoading, allowLoadMore]
  );

  //handle search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  console.log(products);
  return (
    <div className="py-5 h-full">
      <Search page={page} value={search} onChange={handleChange} />
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
        {!isLoading && products?.length === 0 && (
          <div className="mx-5 font-semibold my-2">
            There's no product to display!
          </div>
        )}
      </>
    </div>
  );
};
export default InfiniteScroll;
