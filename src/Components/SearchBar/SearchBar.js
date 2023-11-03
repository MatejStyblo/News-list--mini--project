import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../DataFetching/dataFetching.css";
import { setSearchQuery } from "../Redux/Actions";

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
      id="myinput"
        className="form-control rounded"
        type="text"
        aria-label="Search"
        aria-describedby="search-addon"
        placeholder="Search by title"
        onChange={handleChange}
        value={input} 
      />
      <button
        type="button"
        className="btn btn-outline-primary" 
        onClick={handleSearch}
      >
        search
      </button>
    </div>
  );
};

export default SearchBar;
