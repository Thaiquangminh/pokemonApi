import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { PokemonColection } from './Components/PokemonColection';

interface Pokemons {
  name: string;
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface Detail {
  id:number,
  isOpen:boolean
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=10'
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setLoading(false)
      });

    };

    getPokemons();
  }, []);
  console.log(pokemons);

  const loadMore = async () => {
    setLoading(true)
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false)
    });
  };

  return (
    <div className="App">
      <header className="pokemon-header">Pokemon</header>
      <PokemonColection pokemons={pokemons} />
      <div className="button-wrapper">
        <button className="btn" onClick={loadMore}>
          {loading ? 'Loading' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default App;
