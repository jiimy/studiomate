import axios from "axios";
import apiInstance from "../useInterceptor";

// 포켓몬 리스트
export async function getPoketmonListAll({
  searchInputValue,
  pageParam = 0,
  offset = 21,
}: any) {
  console.log("서치", searchInputValue);
  if (searchInputValue) {
    const res = await apiInstance
      .get(`/pokemon/${searchInputValue}`, {})
      .then((response) => response.data)
      .then((pokemonAll) => pokemonAll);
    return res;
  } else {
    const res = await apiInstance
      .get(`/pokemon`, {
        params: { limit: offset, offset: pageParam },
      })
      .then((response) => response.data)
      .then((pokemonAll) => pokemonAll);
    return res;
  }
}

// 포켓몬 상세정보
// 단일 검색
export async function getPokemonInfoKeyApi(name: string | undefined) {
  const res = await apiInstance.get(`/pokemon/${name}`).then((response) => response.data);
  return res;
}

// url 검색
export async function getPokemonInfoUrlApi(url: string) {
  const res = await apiInstance
    .get(url)
    .then((response) => response.data);
  return res;
}


// 
export async function getPokemonSpeciesApi(name: string | undefined) {
  const res = await apiInstance
    .get(`/pokemon-species/${name}`, {})
    .then((response) => response.data);
  return res;
}
