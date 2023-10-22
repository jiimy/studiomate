import { getPoketmonListAll } from 'api/pokemon';
import Item from 'components/item/Item';
import { useEffect, useState, memo } from 'react';
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import './list.scss';
import { reset } from 'store/search';

const List = () => {
  const [ref, isView] = useInView();
  const dispatch = useDispatch();

  const searchInputValue = useSelector((state: RootState) => state.search.keyword);
  const searchNoResult = useSelector((state: RootState) => state.search.error);

  // console.log('스토어', searchInputValue)

  const {
    data: pokemonListAll,
    fetchNextPage: pokemonListAllFetchNextPage,
    hasNextPage: pokemonListAllHasNextPage,
    status: pokemonListAllStatus,
  } = useInfiniteQuery(
    ["pokemonList", searchInputValue],
    ({ pageParam = 0 }) => getPoketmonListAll({ searchInputValue, pageParam }),
    {
      getNextPageParam: (lastPage, page) => {
        const { next }: any = lastPage;
        if (!next) return undefined;
        return Number(new URL(next).searchParams.get("offset"));
      },
    }
  );

  // 무한 스크롤
  useEffect(() => {
    if (isView && pokemonListAllHasNextPage) pokemonListAllFetchNextPage();
  }, [isView]);

  // console.log('리스트', pokemonListAll);

  return (
    <div>
      {!!searchInputValue &&
        <button onClick={() => {
          dispatch(reset(''))
        }}>전체 목록 보기</button>
      }
      <div className="list">
        {/* 기본 홈 진입시 pokemonListAll*/}
        {!searchInputValue && (
          <>
            {pokemonListAllStatus === "loading" && (
              <div>
                불러오는 중 ...
              </div>
            )}
            {pokemonListAllStatus === "success" && (
              <div className="list-container">
                {pokemonListAll.pages.map((group, index) => (
                  <Item key={index} pokemons={group.results} />
                ))}
                <div ref={ref} />
              </div>
            )}
          </>
        )}

        {/* 검색 결과 */}
        {!!searchInputValue && (
          <>
            {pokemonListAll === undefined && searchNoResult && <div>{searchNoResult}</div>
            }
            {searchNoResult === '' && pokemonListAllStatus === "loading" && (
              <div>
                불러오는 중 ...
              </div>
            )}
            {pokemonListAllStatus === "success" && (
              <div className="">
                {pokemonListAll.pages.map((group, index) => (
                  <Item key={index} pokemons={group.species} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default memo(List)