import { useEffect, useState } from "react";

import axios from "axios";
import { LIMIT as limit } from "../../../constants";
import { Product } from "../../../types";
const useProduct = (page: number, search?: string) => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [allowLoadMore, setAllowLoadMore] = useState(false);

  const getMoreProducts = async (
    limit: number,
    skip: number,
    search?: string
  ) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${
          search || ""
        }&limit=${limit}&skip=${skip}`
      );
      setAllowLoadMore(data.products.length > 0);
      setLoading(false);
      if (page === 1) {
        setProducts([]);
      }
      setProducts((prev) => {
        const updatedProducts = new Set([...(prev ?? []), ...data.products]);
        return Array.from(updatedProducts);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const setIsLoading = (loading: boolean) => {
    setLoading(loading);
  };
  useEffect(() => {
    setIsLoading(true);
    getMoreProducts(limit, (page - 1) * limit, search);
  }, [page, search]);
  return {
    isLoading,
    products,
    allowLoadMore,
    getMoreProducts,
  };
};

export default useProduct;
