import Card from 'components/molecules/Card'
import React from 'react'

type dataType = {
  data?: any[];
}

// max-w-954
const CardList = ({ data }: dataType) => {
  return (
    <div className="grid gap-36 grid-cols-[repeat(auto-fill,minmax(294px,1fr))] m-auto max-w-[80%] place-items-center @[60em]:max-w-[--card-width]">
      {
        data?.map((item: [], index: number) => (
          <Card data={item} key={index} />
        ))
      }
    </div>
  )
}

export default CardList