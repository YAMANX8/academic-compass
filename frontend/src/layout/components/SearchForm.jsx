import { MdOutlineSearch as Search } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

const SearchForm = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`${paths.main.search.byText}/${search}`, {
      state: { byText: true },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-11 rounded-full text-dark transition-all duration-1000 ease-in-out-back focus-within:w-[250px] focus-within:bg-secondary dark:text-light dark:focus-within:bg-secondary-dark"
    >
      <input
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="z-10 w-full cursor-pointer rounded-full bg-transparent py-[10px] pl-9 pr-[10px] outline-none"
      />
      <Search
        size={24}
        className="absolute left-[10px] top-[10px] font-semibold text-dark duration-1000 ease-in-out-back"
      />
    </form>
  );
};

export default SearchForm;
