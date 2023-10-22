import { getPokemonSpeciesApi } from 'api/pokemon';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { convertLanguage } from 'util/convertLanguage';

const DetailCard = ({ pokemonevolutionInfo, pokemonSpeciesInfo, pokemonInfo }: any) => {
  const [prevEvo, setPrevEvo] = useState<any>([]);
  const [nextEvo, setNextEvo] = useState<any>([]);

  const getname = convertLanguage(pokemonSpeciesInfo?.names)
  const getenname = convertLanguage(pokemonSpeciesInfo?.names, "en")?.['name']
  const getdesc = convertLanguage(pokemonSpeciesInfo?.flavor_text_entries)

  useEffect(() => {
    // 진화트리 객체 생성.
    function evolutionFilter(data: any, depth: number): any {
      let tmpDepth: number = depth;
      let result: any = {};

      function recur(data: any, depth: number): void {
        if (data.hasOwnProperty("species")) {
          if (!result[tmpDepth]) {
            result[tmpDepth] = [];
          }
          result[tmpDepth].push(data.species.name);

        }
        // eslint-disable-next-line array-callback-return
        Object.keys(data).map((key: string) => {
          if (Array.isArray(data[key]) && data[key].length > 0 && key === "evolves_to") {
            tmpDepth++;
            for (let i: number = 0; i < data[key].length; i++) {
              recur(data[key][i], tmpDepth);
            }
          }
        });
      }
      recur(data, depth);
      return result;
    }

    const evolutionTree = evolutionFilter(pokemonevolutionInfo.chain, 0);

    function getKeyByValue(obj: any, name: any) {
      for (let i = 0; i < Object.keys(obj).length; i++) {
        if (obj[i].includes(name.toLowerCase())) {
          if (obj[i - 1] !== undefined) {
            getPokemonSpeciesApi(obj[i - 1]).then((res) =>
              setPrevEvo((prevState: any) => [...prevState, convertLanguage(res?.names).name])
            )
          } else {
            setPrevEvo((prevState: any) => [...prevState, '이전 진화가 없습니다'])
          }
          if (obj[i + 1] !== undefined) {
            for (let j = 0; j < obj[i + 1].length; j++) {
              getPokemonSpeciesApi(obj[i + 1][j]).then((res) =>
                setNextEvo((prevState: any) => [...prevState, `${convertLanguage(res?.names).name} `])
              )
            }
          } else {
            setNextEvo((prevState: any) => [...prevState, '이후 진화가 없습니다'])
          }
        }
      }
    }
    getKeyByValue(evolutionTree, getenname)

    return () => {
      setPrevEvo([]);
      setNextEvo([]);
    }
  }, [pokemonevolutionInfo, getenname])



  return (
    <>
      <Helmet>
        <title>포켓몬 정보 - {getname && getname?.['name']}</title>
      </Helmet>
      <div>
        <LazyLoadImage
          key={pokemonInfo?.id}
          src={pokemonInfo?.sprites?.["front_default"]}
          alt={pokemonInfo?.name}
          className="img-lazy"
          loading="lazy"
          width={120}
          height={120}
        />
        이름: {getname && getname?.['name']}
        <br />
        설명: {getdesc && getdesc?.['flavor_text']}
        <br />
        <br />
        {prevEvo && nextEvo ?
          <>
            <div>이전진화: {prevEvo}</div>
            <div>다음진화: {nextEvo}</div>
          </> :
          <>로딩중..</>
        }
      </div>
    </>
  )
}

export default DetailCard