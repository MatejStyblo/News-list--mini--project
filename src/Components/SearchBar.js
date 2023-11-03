import React, { useState, useEffect } from 'react'
import {  useSelector } from 'react-redux';
import "./dataFetching.css"
const SearchBar = ({ setFilteredPosts }) => {
    const post = useSelector(store => store.post);

    const [searchInput, setSearchInput] = useState("");
    post.filter(post => post.id).map(post => post.id)
    useEffect(() => {
        setFilteredPosts(post);
    }, [post, setFilteredPosts]);

    const handleSearch = () => {
        const filtered = post.filter((post) =>
            post.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        if (e.target.value === '') {
            setFilteredPosts(post);
        }
    };


    return (
        <div class="input-group searchBar shadow p-3 mb-5 bg-white">
            <input
                class="form-control rounded"
                type="search" aria-label="Search" aria-describedby="search-addon"
                placeholder="Title search here"
                onChange={handleChange}
                value={searchInput} />         <button type="button" class="btn btn-outline-primary" onClick={handleSearch}>search</button>
        </div>




    )
}

export default SearchBar