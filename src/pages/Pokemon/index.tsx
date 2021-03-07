import React from 'react';
import cn from 'classnames';
import Heading, { TitleSize } from '../../components/Heading';
import useData from '../../hook/getData';

import s from './Pokemon.module.scss';

interface IPokemon {
  id: number;
  abilities: string[];
  img: string;
  name: string;
  types: string[];
  stats: {
    attack: number;
    defense: number;
    ['special-attack']: number;
    ['special-defense']: number;
  };
}

const Pokemon: React.FC = () => {
  const { data, isLoading, error } = useData<IPokemon>('pokemons', 'getPokemon', { id: 10 }, []);
  console.log('pokemon', data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, some error happened</p>;
  }

  return (
    <>
      {data && (
        <div className={s.root}>
          <div className={s.card}>
            <div className={s.imageContainer}>
              <div>
                <img width="255" height="261" src={data.img} alt={data.name} />
              </div>
              <div className={s.types}>
                {data.types.map((nature: string) => (
                  <span key={nature + data.id} className={cn(s.label, s[nature as keyof typeof s])}>
                    {nature}
                  </span>
                ))}
              </div>
            </div>
            <div className={s.infoContainer}>
              <Heading tag={TitleSize.xl} className={s.titleName}>
                {data.name}
              </Heading>
              <div className={s.abilities}>
                <h2>Abilities</h2>
                {data.abilities.map((ability) => (
                  <div key={ability + data.id} className={s.ability}>{ability}</div>
                ))}
              </div>
              <div className={s.statsContainer}>
                <div className={s.statsWrapper}>
                  <div className={s.statItem}>
                    <div className={s.statValue}>{data.stats.attack}</div>
                    Attack
                  </div>
                </div>
                <div className={s.statsWrapper}>
                  <div className={s.statItem}>
                    <div className={s.statValue}>{data.stats.defense}</div>
                    Defense
                  </div>
                </div>
                <div className={s.statsWrapper}>
                  <div className={s.statItem}>
                    <div className={s.statValue}>{data.stats["special-attack"]}</div>
                    Sp attack
                  </div>
                </div>
                <div className={s.statsWrapper}>
                  <div className={s.statItem}>
                    <div className={s.statValue}>{data.stats["special-defense"]}</div>
                    Sp defense
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pokemon;
