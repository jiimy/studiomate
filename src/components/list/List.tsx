import { getPoketmonListAll } from 'api/pokemon';
import Item from 'components/item/Item';
import { useEffect, useState, memo } from 'react';
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import './list.scss';

const List = () => {
  const [ref, isView] = useInView();

  const searchInputValue = useSelector((state: RootState) => state.search.keyword);

  // console.log('스토어', searchInputValue)

  const {
    data: pokemonListAll,
    fetchNextPage: pokemonListAllFetchNextPage,
    hasNextPage: pokemonListAllHasNextPage,
    isFetching, // 첫 페이지 fetching 여부, Boolean
    isFetchingNextPage, // 추가 페이지 fetching 여부, Boolean
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

  console.log('리스트', pokemonListAll);


  return (
    <div>
      <div className="list">
        {/* 기본 홈 진입시 pokemonListAll*/}
        {!searchInputValue && (
          <>
            {pokemonListAllStatus === "loading" && (
              <div>
                불러오는 중 ...
              </div>
            )}
            {/* {status === "error" && <p>{error?.message}</p>} */}
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
            {pokemonListAllStatus === "loading" && (
              <div>
                검색 중 ...
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