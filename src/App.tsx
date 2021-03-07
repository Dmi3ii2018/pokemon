import React from 'react';
import cn from "classnames";
import s from "./App.module.scss";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import Ability from "./pages/Ability";

const App = () => (
    <div>
        <Pokedex />
        {/* <Pokemon /> */}
        {/* <Ability /> */}
    </div>
)

export default App
