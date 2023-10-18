import React from 'react'
import { ReactComponent as Bookmark_off } from '../icons/Bookmark_off.svg';
import { ReactComponent as Bookmark_on } from '../icons/Bookmark_on.svg';

type bookmarkState = {
  state: boolean;
  className?: any;
}

const BookMark = ({ state, className }: bookmarkState) => {
  return (
    <>
      {state ?
        // eslint-disable-next-line react/jsx-pascal-case
        <Bookmark_on className={className} /> : <Bookmark_off className={className} />
      }
    </>
  )
}

export default BookMark