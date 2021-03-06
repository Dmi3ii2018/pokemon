import React from "react";
import cn from "classnames";
import Heading, { TitleSize } from "../Heading";

import s from "./PokemonCard.module.scss";

interface IPokemonCard {
  id: number;
  name: string;
  attack: number;
  deffense: number;
  imgSrc: string;
}

const PokemonCard: React.FC<IPokemonCard> = ({
  id,
  name,
  attack,
  deffense,
  imgSrc,
}) => (
  <div className={s.root}>
    <div className={s.infoWrap}>
      <Heading tag={TitleSize.xl} className={s.titleName}>
        {name}
      </Heading>
      <div className={s.statWrap}>
        <div className={s.statItem}>
          <div className={s.statValue}>{attack}</div>
          Attack
        </div>
        <div className={s.statItem}>
          <div className={s.statValue}>{deffense}</div>
          Defense
        </div>
      </div>
    </div>
    <div className={s.pictureWrap}>
      <img src={imgSrc} alt={name} />
    </div>
  </div>
);

export default PokemonCard;
