/* SETUP */
import React, {useState, useCallback} from 'react';
import './SearchBar.css';

/* COMPONENT */
const SearchBar = (props) =>{
    const [term, setTerm]=useState("");
    /* GET AND STORE DATA */
    const termChangeHandler = useCallback((event)=>{setTerm(event.target.value)},[]);
    /* ACCESS DATA */
    const search = useCallback(()=>{props.onSearch(term)},[props.onSearch, term]);

    return (
        <div className='center'>
        <div className="SearchBar">
            <input placeholder='Enter A Song Title' onChange={termChangeHandler}/>
            <button className="SearchButton" onClick={search}>Search</button>
        </div>
        </div>
    );
};

export default SearchBar;