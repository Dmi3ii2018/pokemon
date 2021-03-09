import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import Ability from './pages/Ability';

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact render={() => <Pokedex />} />
      <Route path="/pokemon/:id/" exact render={() => <Pokemon />} />
      <Route path="/ability/:name/" render={() => <Ability />} />
    </Switch>
  </div>
);

export default App;
