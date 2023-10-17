/* SETUP */
import React, {useState, useCallback} from 'react';
import './SearchBar.css';

/* COMPONENT */
const SearchBar = ({ onSearch }) => {
    /* GET DATA */
    const [term, setTerm] = useState("");
  /* ACCESS DATA */
    const termChangeHandler = useCallback((event) => {
      setTerm(event.target.value);
    }, []);
  
    const search = useCallback(() => {
      onSearch(term);
    }, [onSearch, term]);
  
    return (
      <div className='center'>
        <div className="SearchBar">
          <input placeholder='Enter A Song Title' onChange={termChangeHandler} />
          <button className="SearchButton" onClick={search}>Search</button>
        </div>
      </div>
    );
  };

export default SearchBar;