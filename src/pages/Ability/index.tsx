import React, { useState, useEffect, useRef, RefObject } from 'react';
import useData from '../../hook/getData';
import style from './Ability.module.scss';
import PokemonCard from '../../components/PokemonCard';
import { IPokemons } from '../../interface/pokemons';

interface IEffect {
  effect: string;
}

interface IAbility {
  name: string;
  ['effect_entries']: IEffect[];
  pokemon: any[];
}

const Ability: React.FC = () => {
  const { data, isLoading, error } = useData<IAbility>(
    'pokemonsAbilities',
    'getAbilities',
    { name: 'tinted-lens' },
    [],
  );
  console.log(data);
  const [pokemons, setPokemons] = useState<IPokemons[]>([]);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const slider = useRef<HTMLDivElement>();
  console.log(pokemons);
  useEffect(() => {
    if (data) {
      const req = data.pokemon.reduce((acc, cur) => {
        acc.push(fetch(`https://cors.bridged.cc/http://zar.hosthot.ru/api/v1/pokemon/${cur.pokemon.name}`));
        return acc;
      }, []);

      Promise.all(req)
        .then((res) => Promise.all(res.map((it: any) => it.json())))
        .then((res) => setPokemons(res));
    }
  }, [data]);

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDown(true);
    if (slider && slider.current) {
      setStartX(e.pageX - slider.current.offsetLeft);
      setScrollLeft(slider.current.scrollLeft);
    }
  };

  const mouseLeaveHandler = () => {
    setIsDown(false);
  };

  const mouseUpHandler = () => {
    setIsDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDown) return;
    e.preventDefault();
    if (slider && slider.current) {
      const x = e.pageX - slider.current.offsetLeft;
      const walk = (x - startX) * 2;
      slider.current.scrollLeft = scrollLeft - walk;
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, some error happened</p>;
  }

  return (
    <>
      {data && (
        <div className={style.root}>
          <div className={style.container}>
            <h1>{data.name}</h1>
            <hr />
            <p className={style.description}>{data.effect_entries[1].effect}</p>
          </div>
          <div className={style.container}>
            <h2>Related Pokemons</h2>
            <hr />
          </div>
          <div
            tabIndex={0}
            role="slider"
            aria-valuenow={0}
            onMouseDown={mouseDownHandler}
            onMouseLeave={mouseLeaveHandler}
            onMouseUp={mouseUpHandler}
            onMouseMove={mouseMoveHandler}
            ref={slider as RefObject<HTMLDivElement>}
            className={style.sliderContainer}>
            {pokemons &&
              pokemons.map((pokemon) => {
                if (pokemon.stats) {
                  return (
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
                  );
                }
                return null
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Ability;
