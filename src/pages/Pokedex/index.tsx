import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';

import Layout from '../../components/Layout';
import Heading, { TitleSize } from '../../components/Heading';
import PokemonCard from '../../components/PokemonCard';
import Input from '../../components/Form/Input';
import { IPokemons, IData, IQuery, IOffset } from '../../interface/pokemons';

import h from './Pokedex.module.scss';
import useData from '../../hook/getData';
import useDebounce from '../../hook/useDebounce';
import Pagination from '../../components/Pagination';

const LIMIT = 20;

const PokedexPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchQuery, setQuery] = useState<IQuery>({});
  const [offset, setOffset] = useState<IOffset>({
    limit: LIMIT
  });
  const debaunceValue = useDebounce(searchValue, 1000);

  const { data, isLoading, error } = useData<IData>('pokemons', 'getPokemons', {...searchQuery, ...offset}, [searchValue, offset]);

  useEffect(() => {
    setOffset((state) => ({
      ...state,
      offset: null,
    }))
    setQuery((state) => ({
      ...state,
      name: debaunceValue,
    }));
  }, [debaunceValue]);

  const onPageChange = useCallback((pageNumber: number) => {
    setOffset((state) => ({
      ...state,
      offset: LIMIT * pageNumber,
    }));
  }, [])

  const handleSearchChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(() => evt.target.value);
  }, []);

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
                  name={pokemon.name}
                  abilities={pokemon.abilities}
                  type={pokemon.types}
                  attack={pokemon.stats.attack}
                  deffense={pokemon.stats.defense}
                />
              ))
            ) : (
              <img src="https://overreacted.io/fc3bddf6d4ca14bc77917ac0cfad3608/pikachu.gif" alt="pick" />
            )}
          </div>
          <Pagination onPageChange={onPageChange} total={data ? data.total : 0} searchValue={searchValue} />
        </div>
      </Layout>
    </div>
  );
};

export default React.memo(PokedexPage);
