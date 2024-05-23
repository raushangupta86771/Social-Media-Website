import React from 'react'
import { useState } from "react";
import "./Search.css"
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';

const Search = ({setInput,handleReset}) => {

    const [results, setResults] = useState([]);

    return (


        <div className='Search'>
            <div className="search-bar-container">
                <SearchBar setResults={setResults} handleReset={handleReset} setInput={setInput}/>
                {results && results.length > 0 && <SearchResults results={results} setResults={setResults} handleReset={handleReset} setInput={setInput}/>}
            </div>
        </div>
    )
}

export default Search