import React from 'react';
import useFetch from '../hooks/useFetch.jsx';
import AuthorList from '../components/authors/authorList.jsx';
import api from '../config/api.jsx';

const AllAuthorsPage = () => {
  const { isLoaded, data: authors } = useFetch(api.authors());
  if (!isLoaded) return true;
  return (
    <AuthorList authors={authors}/>
  );
};

export default AllAuthorsPage;
