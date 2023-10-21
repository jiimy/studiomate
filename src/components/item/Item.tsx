import Card from "components/card/Card";
import { PokemonBasic } from "module/types";
import { memo } from "react";


type pockemonIndexType = {
  pokemons?: PokemonLink[] | any;
}

type PokemonLink = {
  name: string;
  url: string;
}

const Item = ({ pokemons }: pockemonIndexType) => {
  // console.log('데이터 : ', pokemons, pokemons?.length);

  return (
    <>
      {pokemons?.length !== undefined ?
        pokemons?.map((pokemon: PokemonBasic) => (
          <Card key={pokemon.url} pokemonName={pokemon.name} />
        ))
        :
        <Card key={pokemons.url} pokemonName={pokemons.name} />
      }
    </>
  );
};

export default memo(Item)