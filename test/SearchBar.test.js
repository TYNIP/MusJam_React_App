// test/SearchBar.test.js
const { expect } = require('chai');
const SearchBar = require('../src/components/SearchBar'); // Import your component

describe('SearchBar Component', () => {
  it('should render a SearchBar', () => {
    const searchBar = new SearchBar(); // Instantiate your component

    // Use Chai assertions to check if the component renders as expected
    expect(searchBar.render()).to.include('Enter A Song Title');
    expect(searchBar.render()).to.include('Search');
  });

  it('should call the onSearch function when the button is clicked', () => {
    const onSearch = (value) => {
      // Your custom implementation to track if the function was called
    };

    const searchBar = new SearchBar({ onSearch }); // Pass a mock function as a prop

    // Simulate a button click
    searchBar.onButtonClick();

    // Check if the onSearch function was called as expected
    // Implement your specific expectations here
  });
});