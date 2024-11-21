import { useState } from "react";
import { Product } from "../types";
import axios from "axios";
const useProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const getProducts = async (limit?: number) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${limit || 20}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };
  const getMoreProducts = async (limit: number, skip: number) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      setLoading(false);
      setProducts((prev) => [...prev!, ...data.products]);
    } catch (err) {
      console.log(err);
    }
  };
  const setIsLoading = (loading: boolean) => {
    setLoading(loading);
  };
  return { isLoading, products, setIsLoading, getProducts, getMoreProducts };
};

export default useProduct;
