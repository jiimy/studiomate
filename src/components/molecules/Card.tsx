import BookMark from 'components/atoms/BookMark';
import React from 'react'
import { ReactComponent as Won } from 'components/icons/won.svg';
import GradeStar from 'components/icons/GradeStar';

type dataType = {
  data?: any;
}

const Card = ({ data }: dataType) => {
  console.log('data', data);
  return (
    <div className='card'>
      {/* 상태 체크를 위한 임시 코드 */}
      <BookMark state={data.id === 0 || data.id === 3 || data.id === 6 ? true : false} className="absolute right-[16px] top-[16px]" />
      <img src={data.thumbnail} alt="" className='w-full h-180' />
      <div className='px-20 pt-10 pb-15 item'>
        <div>
          <div className='h1'>{data.title}</div>
          <p className='truncate body3 text-gray02 mb-9'>{data.description}</p>
        </div>
        <div className='pt-12 mt-10 border-t border-gray03'>
          <div className='flex items-center'>
            <img src={data.companyImg} alt="" className='inline-flex w-24 h-24 mr-8' />
            <strong>{data.companyName}</strong>
            <span className='inline-flex items-center gap-3 ml-9'>
              <GradeStar className={data.gradeCount === 0 ? 'fill-gray03' : 'fill-green'} />
              <span className='h2 text-gray01'>
                {data.gradePoint}
              </span>
              <span className='body1 text-gray02'>({data.gradeCount})</span>
            </span>
          </div>
          <div className='mt-8 body2 text-gray02'>{data.welfare}</div>
        </div>
        {
          data.congratulationMoney &&
          <>
            <div className='flex leading-27 pt-8 mt-12 border-t border-gray03 h3 relative -left-[6px]'><Won className='inline-flex' />취업 축하금 : {data.congratulationMoney}만원</div>
          </>
        }
      </div>
    </div>
  )
}

export default Card