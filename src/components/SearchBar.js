
import React from 'react';

import axios from 'axios';
import Downshift from 'downshift';
import './SearchBar.css'; // Importing CSS file for styling

const SearchBar = ({ setBooks, books, navigateToBook }) => {
  const searchBooks = value => {
    if (value) {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&orderBy=newest&key=AIzaSyAeldNoTUwjHYAXBpMwAEO-fPHd26K7MxA&maxResults=10`)
        .then(res => {
          setBooks(res.data.items);
        })
        .catch(err => console.log(err));
    } else {
      setBooks([]);
    }
  }

  return (
    <Downshift
      onInputValueChange={value => searchBooks(value)}
      itemToString={item => (item ? item.volumeInfo.title : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        inputValue,
        selectedItem,
        getLabelProps,
      }) => (
        <div>
          <label {...getLabelProps()}className="inputLabel">Search Book :</label>
          <input {...getInputProps()} style={{marginLeft: '10px'}} />
          <ul {...getMenuProps()} className="book-list">
            {isOpen && books && books.map((book, index) => (
              <li {...getItemProps({
                key: book.id,
                index,
                item: book,
                style: {
                  backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                  fontWeight: selectedItem === book ? 'bold' : 'normal',
                },
               
              })}>
                <div className="book-card">
                  {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="book-image" />}
                  <div className="book-info">
                    <h2 className="book-title">{book.volumeInfo.title}</h2>
                     {book.volumeInfo.authors && <p className="book-author">{book.volumeInfo.authors.join(', ')}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
}

export default SearchBar;
