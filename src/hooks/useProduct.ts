import { useEffect, useState } from "react";
import { Product } from "../types";
import axios from "axios";
const useProduct = (page: number) => {
  const limit = 3;
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [allowLoadMore, setAllowLoadMore] = useState(false);
  const getProducts = async (limit?: number) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${limit || 20}&skip=0`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };
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
      if (products) {
        setProducts((prev) => [...prev!, ...data.products]);
      } else {
        setProducts(data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setIsLoading = (loading: boolean) => {
    setLoading(loading);
  };
  useEffect(() => {
    setIsLoading(true);
    getMoreProducts(limit, (page - 1) * limit, "");
  }, [page]);
  return {
    isLoading,
    products,
    allowLoadMore,
  };
};

export default useProduct;
