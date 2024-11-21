import { useEffect, useState } from "react";
import { useProduct } from "../hooks";

interface Props {
  page: number;
}

const Search = (props: Props): React.JSX.Element => {
  const limit = 20;
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(props.page);
  const { getMoreProducts } = useProduct(page, search);
  //handle search by name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search !== "") {
      const timer = setTimeout(() => {
        setPage(1);
        getMoreProducts(20, (page - 1) * limit, search);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [search]);
  return (
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
  );
};
export default Search;
