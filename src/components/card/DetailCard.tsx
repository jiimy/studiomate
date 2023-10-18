import { getPokemonInfoUrlApi } from 'api/pokemon';
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { convertLanguage } from 'util/convertLanguage'

const DetailCard = ({ pokemonevolutionInfo, pokemonSpeciesInfo, pokemonInfo }: any) => {
  const [prevEvo, setPrevEvo] = useState('');
  const [nextEvo, setNextEvo] = useState('');

  const getname = convertLanguage(pokemonSpeciesInfo?.names)
  const getdesc = convertLanguage(pokemonSpeciesInfo?.flavor_text_entries)

  useEffect(() => {
    // 진화트리 추출
    const speciesArray: any[] = [];

    function extractSpecies(data: any) {
      if (data instanceof Array) {
        data.forEach((item) => {
          extractSpecies(item);
        });
      } else if (data instanceof Object) {
        if (data.species) {
          speciesArray.push(data.species);
        }
        for (const key in data) {
          extractSpecies(data[key]);
        }
      }
    }
    extractSpecies([pokemonevolutionInfo]);

    console.log('진화트리 : ', speciesArray, pokemonevolutionInfo);
    // 진화트리가 있을때
    if (speciesArray.length >= 2) {
      const self = convertLanguage(pokemonSpeciesInfo?.names, 'en')?.['name'].toLowerCase();
      const currentIndex = speciesArray.findIndex((item: any) => item.name === self);

      if (speciesArray[currentIndex - 1] !== undefined) {
        getPokemonInfoUrlApi(speciesArray[currentIndex - 1].url).then((res) =>
          setPrevEvo(convertLanguage(res.names)?.['name'])
        )
      } else {
        setPrevEvo('이전 진화가 없습니다.')
      }
      if (speciesArray[currentIndex + 1] !== undefined) {
        getPokemonInfoUrlApi(speciesArray[currentIndex + 1].url).then((res) =>
          setNextEvo(convertLanguage(res.names)?.['name'])
        )
      } else {
        setNextEvo('다음 진화가 없습니다.')
      }
    }

    return () => {
      setPrevEvo('');
      setNextEvo('');
    }
  }, [pokemonevolutionInfo])

  return (
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
  )
}

export default DetailCard