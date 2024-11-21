import { useState } from "react";
import useProduct from "../hooks/useProduct";

const Search = (): React.JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
