import List from 'components/list/List'
import SearchBar from 'components/searchbar/Searchbar'
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Main = () => {
  return (
    <>
      <Helmet>
        <title>포켓몬 도감</title>
      </Helmet>
      <div>
        <SearchBar />
        <List />
      </div>
    </>
  )
}

export default Main