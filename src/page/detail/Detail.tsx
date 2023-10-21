import { getPokemonInfoKeyApi, getPokemonInfoUrlApi, getPokemonSpeciesApi } from 'api/pokemon';
import DetailCard from 'components/card/DetailCard';
import { useQuery } from "react-query";
import { useParams } from 'react-router';
import { convertLanguage } from 'util/convertLanguage';

const Detail = () => {
  const { id } = useParams();

  // 기본 정보
  const { data: pokemonInfo } = useQuery(
    ["pokemonId", id],
    () => getPokemonInfoKeyApi(id),
    { enabled: !!id }
  );

  // 종 정보
  const { data: pokemonSpeciesInfo } = useQuery(
    ["pokemon-species", id],
    () => getPokemonSpeciesApi(id),
    { enabled: !!id }
  );

  // 진화정보
  const { data: pokemonevolutionInfo } = useQuery(
    ["pokemon-evolution"],
    () => getPokemonInfoUrlApi(pokemonSpeciesInfo?.evolution_chain?.url), // url으로 가져옴 
    { enabled: !!pokemonSpeciesInfo }
  );

  // console.log('포켓몬 기본정보 : ', pokemonInfo);
  // console.log('포켓몬 종 : ', pokemonSpeciesInfo);
  // console.log('포켓몬 진화 : ', pokemonevolutionInfo);

  return (
    <div>
      {pokemonInfo && pokemonSpeciesInfo && pokemonevolutionInfo ?
        <DetailCard pokemonevolutionInfo={pokemonevolutionInfo} pokemonSpeciesInfo={pokemonSpeciesInfo} pokemonInfo={pokemonInfo} /> : '로딩중..'
      }
    </div>
  )
}

export default Detail