import React from 'react'
import InResult from './InResult';
import "./SearchResults.css"

const SearchResults = ({ results, setResults, setInput,handleReset }) => {
    return (
        <div className='results-list'>
            {results?.map((result, id) => {
                return <InResult result={result} key={id} setResults={setResults} setInput={setInput} handleReset={handleReset} />;
            })}
        </div>
    )
}

export default SearchResults