import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';

import Layout from '../../components/Layout';
import Heading, { TitleSize } from '../../components/Heading';
import Input from '../../components/Form/Input';
import PokemonCard from '../../components/PokemonCard';
import FormGroup from '../../components/Form';

import { IPokemons, IData, IQuery } from '../../interface/pokemons';

import h from './Pokedex.module.scss';
import useData from '../../hook/getData';
import useDebounce from '../../hook/useDebounce';

const PokedexPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [query, setQuery] = useState<IQuery>({});

  const debaunceValue = useDebounce(searchValue, 1000);

  const { data, isLoading, error } = useData<IData>('getPokemons', query, [searchValue, type]);

  useEffect(() => {
    setQuery((state) => ({
      ...state,
      name: debaunceValue,
    }));
  }, [debaunceValue]);

  const handleSearchChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  }, []);

  const handleSelectChange = useCallback(
    (type: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      setType(evt.target.value);
      setQuery((state) => ({
        ...state,
        [type]: evt.target.value,
      }));
    },
    [],
  );

  if (error) {
    return <div>Smth went wrong </div>;
  }

  return (
    <div className={cn(h.root)}>
      <Layout>
        <div>
          <Heading tag={TitleSize.xl}>Total number: {!isLoading && data && data.total}</Heading>
          <div>
            <Input searchValue={searchValue} queryHandler={handleSearchChange} />
          </div>
          <div className={cn(h.cardContainer)}>
            {!isLoading && data ? (
              data.pokemons.map((pokemon: IPokemons) => (
                <PokemonCard
                  id={pokemon.id}
                  key={pokemon.id}
                  imgSrc={pokemon.img}
                  type={pokemon.types}
                  name={pokemon.name}
                  attack={pokemon.stats.attack}
                  deffense={pokemon.stats.defense}
                />
              ))
            ) : (
              <img src="https://overreacted.io/fc3bddf6d4ca14bc77917ac0cfad3608/pikachu.gif" alt="pick" />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default React.memo(PokedexPage);
