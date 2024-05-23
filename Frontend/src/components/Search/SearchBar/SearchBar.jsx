import React from 'react'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"
import axios from 'axios';


const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");


    const fetchData = (value) => {
        axios.get("http://localhost:5000/user")
            .then((response) => {
                console.log(response.data);
                const results = response.data?.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.firstname &&
                        user.lastname &&
                        user.username &&
                        user.firstname.toLowerCase().includes(value)
                    );
                });
                setResults(results);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    const handleReset = () => {
        setInput("");
        setResults([])
    }


    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input className='ipt-search'
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            <img onClick={handleReset} className='adj-cross-icon' src="https://static.thenounproject.com/png/128143-200.png" alt="" />
        </div>
    )
}

export default SearchBar