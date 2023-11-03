import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./dataFetching.css";
import { setSearchQuery } from "./Buttons/Actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(input));
  };

  return (
    <div className="input-group searchBar shadow p-3 mb-5 bg-white">
      <input
        className="form-control rounded" // Opraveno z class na className
        type="text"
        aria-label="Search"
        aria-describedby="search-addon"
        placeholder="Search by title"
        onChange={handleChange}
        value={input} // Změněno na lokální stav input
      />
      <button
        type="button"
        className="btn btn-outline-primary" // Opraveno z class na className
        onClick={handleSearch}
      >
        search
      </button>
    </div>
  );
};

export default SearchBar;
