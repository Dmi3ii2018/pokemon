import React from 'react';
import cn from "classnames";
import s from "./App.module.scss";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon"

const App = () => (
    <div>
        {/* <Pokedex /> */}
        <Pokemon id={10} />
    </div>
)

export default App
