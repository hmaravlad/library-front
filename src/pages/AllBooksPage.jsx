import React from 'react';
import useFetch from '../hooks/useFetch.jsx';
import BookList from '../components/books/bookList.jsx';
import api from '../config/api.jsx';

const AllBooksPage = () => {
  const { isLoaded, data: books } = useFetch(api.books());
  if (!isLoaded) return true;
  return (
    <BookList books={books}/>
  );
};

export default AllBooksPage;
