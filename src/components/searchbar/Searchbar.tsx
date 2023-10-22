import React, { useState } from 'react'
import './searchbar.scss';
import { useDispatch } from 'react-redux';
import { input } from 'store/search';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(input(text))
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="search" name="" id="" placeholder='포켓몬 번호 검색' className='searchbar'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </form>
  )
}

export default SearchBar