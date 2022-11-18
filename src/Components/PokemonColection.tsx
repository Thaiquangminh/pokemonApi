import React from 'react';
import PokemonList from './PokemonList';
import './pokemon.css';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface props {
  pokemons: Pokemon[];

}

const PokemonColection: React.FC<props> = (props) => {
  const { pokemons } = props;
  const handleShowDetail = (id: number) => {
    console.log(id);
    
  }
  return (
    <section className="collection-container">
      {pokemons.map((pokemon) => {
        return (
          <div onClick={() => handleShowDetail(pokemon.id)}>
            <PokemonList
              key={pokemon.name}
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.sprites.front_default}
            />
          </div>
        );
      })}
    </section>
  );
};

export { PokemonColection };
