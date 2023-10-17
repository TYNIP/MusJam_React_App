// test/SearchBar.test.js
const { expect } = require('chai');
const SearchBar = require('../src/components/SearchBar'); // Import component

describe('SearchBar Component', () => {
  it('should render a SearchBar', () => {
    const searchBar = new SearchBar(); // Instantiate component

    // Check if the component renders as expected (CHAI)
    expect(searchBar.render()).to.include('Enter A Song Title');
    expect(searchBar.render()).to.include('Search');
  });

  it('should call the onSearch function when the button is clicked', () => {
    const onSearch = (value) => {
      
    };

    const searchBar = new SearchBar({ onSearch }); 
    searchBar.onButtonClick();

  });
});