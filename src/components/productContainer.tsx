import { useCallback, useEffect, useRef, useState } from "react";
import ProductItem from "./productItem";
import { useDebounce, useProduct } from "../hooks";

const ProductContainer = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 500);
  const { isLoading, products, allowLoadMore } = useProduct(
    page,
    debounceSearch
  );
  console.log(debounceSearch);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  //   console.log(products);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);
  return (
    <div className="py-5">
      <div className="mx-5 my-5 rounded-sm">
        <input
          type="text"
          onChange={handleChange}
          value={search}
          className="border border-gray-300 rounded-sm w-[500px] p-2 outline-none"
          name="search"
          placeholder="search by product name"
        />
      </div>
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
