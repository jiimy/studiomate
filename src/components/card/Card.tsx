import { getPokemonInfoKeyApi, getPokemonSpeciesApi } from "api/pokemon";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import './card.scss';

type pokemonNameType = {
  pokemonName: string;
}

const Card = ({ pokemonName }: pokemonNameType) => {
  const { data: pokemonInfo } = useQuery(
    ["pokemonName", pokemonName],
    () => getPokemonInfoKeyApi(pokemonName),
    { enabled: !!pokemonName }
  );


  const { data: pokemonSpeciesInfo } = useQuery(
    ["pokemon-species", pokemonInfo?.species?.name],
    () => getPokemonSpeciesApi(pokemonInfo?.species?.name),
    { enabled: !!pokemonInfo?.species?.name }
  );

  // console.log('포켓몬 이름 : ', pokemonSpeciesInfo?.names);

  return (
    <Link to={`/pokemon/${pokemonInfo?.id}`}>
      <span>번호 {pokemonInfo?.id}</span>
      <LazyLoadImage
        key={pokemonInfo?.id}
        src={pokemonInfo?.sprites?.["front_default"]}
        alt={pokemonInfo?.name}
        className="img-lazy"
        loading="lazy"
        width={120}
        height={120}
      />
    </Link>
  )
}

export default Card