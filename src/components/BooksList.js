import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = {
  container: {
    margin: '40px',
    textAlign: 'center',
  },
  image: {
    width: '150px',
    transition: 'transform 0.3s',
  },
  imageHover: {
    width: '150px',
    transform: 'scale(1.1)',
    transition: 'transform 0.3s',
  },
  title: {
    color: 'lightgrey',
  },
  author: {
    color: 'lightgrey',
  },
  authorHover: {
    color: 'lightgrey',
    textShadow: '0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF',
  },
};

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = () => {
    if (books.length >= 20) {
      setHasMore(false);
      return;
    }
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=AIzaSyAeldNoTUwjHYAXBpMwAEO-fPHd26K7MxA&startIndex=${books.length}&maxResults=10`
      )
      .then((res) => {
        if (res.data.items.length > 0) {
          setBooks((books) => [...books, ...res.data.items]);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchBooks}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {books.map((book) => {
        const { id, volumeInfo } = book;
        const { title, authors, imageLinks } = volumeInfo;
        return (
          <div key={id} style={styles.container}>
            <img
              src={imageLinks?.thumbnail}
              alt={title}
              style={styles.image}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = ''}
            />
            <h2 style={styles.title}>{title}</h2>
            <p
              style={styles.author}
              onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.textShadow = ''}
            >
              {authors?.join(', ')}
            </p>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};

export default BooksList;
