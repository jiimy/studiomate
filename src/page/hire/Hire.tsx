import CardList from 'components/organisms/CardList'
import React from 'react'
import dummyData from './dummyData';

const Hire = () => {
  return (
    <div className='mt-48 mb-48 @container'>
      <CardList data={dummyData} />
    </div>
  )
}

export default Hire