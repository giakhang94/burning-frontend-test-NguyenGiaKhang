import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks";
import useProduct from "../../../components/InfiniteScroll/hooks/useProduct";

interface SearchProps {
  page: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Search = ({ page, onChange, value }: SearchProps): React.JSX.Element => {
  const [pageSearch, setPageSearch] = useState<number>(page);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 800);
  const { isLoading } = useProduct(page, debouncedSearch);

  useEffect(() => {
    setPageSearch(1);
  }, [debouncedSearch]);
  return (
    <div className="mx-5 mb-5 rounded-sm">
      {isLoading && <></>}
      <input
        type="text"
        onChange={onChange}
        value={value}
        className="border border-gray-300 rounded-sm w-[500px] p-2 outline-none"
        name="search"
        placeholder="search by product name"
      />
    </div>
  );
};
export default Search;
