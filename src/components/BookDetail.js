// BookDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => {
                setBook(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h2>{book.volumeInfo.title}</h2>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            <p>{book.volumeInfo.description}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default BookDetail;
