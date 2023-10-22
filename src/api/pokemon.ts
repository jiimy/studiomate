import axios from "axios";
import apiInstance from "../useInterceptor";
import store from "store";
import { ERROR } from "store/search";

// 포켓몬 리스트
export async function getPoketmonListAll({
  searchInputValue,
  pageParam = 0,
  offset = 21,
}: any) {
  if (searchInputValue) {
    const res = await apiInstance
      .get(`/pokemon/${searchInputValue}`, {})
      .then((response) => {
        store.dispatch(ERROR(""));
        return response.data;
      })
      .then((pokemonAll) => pokemonAll)
      .catch((err) => {
        console.log("err:", err);
        if (err.response.status === 404) {
          store.dispatch(ERROR("없는 번호/이름 입니다"));
        }
      });
    return res;
  } else {
    const res = await apiInstance
      .get(`/pokemon`, {
        params: { limit: offset, offset: pageParam },
      })
      .then((response) => response.data)
      .then((pokemonAll) => pokemonAll)
      .catch((err) => console.log("err", err));
    return res;
  }
}

// 포켓몬 상세정보
// 단일 검색
export async function getPokemonInfoKeyApi(name: string | undefined) {
  const res = await apiInstance
    .get(`/pokemon/${name}`)
    .then((response) => response.data);
  return res;
}

// url 검색
export async function getPokemonInfoUrlApi(url: string) {
  const res = await apiInstance.get(url).then((response) => response.data);
  return res;
}

// 번역
export async function getPokemonSpeciesApi(name: string | undefined) {
  const res = await apiInstance
    .get(`/pokemon-species/${name}`, {})
    .then((response) => response.data);
  return res;
}
