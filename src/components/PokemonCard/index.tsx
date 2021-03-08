import React from 'react';
import cn from "classnames";

import s from './PokemonCard.module.scss';

interface IPokemonCard {
  id: number;
  name: string;
  attack: number;
  deffense: number;
  type: string[];
  abilities: string[];
  imgSrc: string;
}

const PokemonCard: React.FC<IPokemonCard> = ({ id, name, attack, deffense, type, imgSrc, abilities }) => (
  <div className={s.root}  data-name={name}>
    <div className={cn(s.pictureWrap, s[type[0] as keyof typeof s])}>
      <img src={imgSrc} alt={name} />
    </div>
  </div>
);

export default PokemonCard;
