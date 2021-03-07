import getUrlWithParamsConfig from "./getUrlsWithParamsConfig";

describe("GetUrlWithParamsConfig", () => {
  test('Should take three arguments  "pokemons", "getPokemons" and empty object, and return object with properties: pathname, protocol, host and empty query', () => {
    const url = getUrlWithParamsConfig("pokemons", "getPokemons", {});

    expect(url).toEqual({
      protocol: "http",
      host: "zar.hosthot.ru",
      pathname: "/api/v1/pokemons",
      query: {},
    })
  });

  test('Should take three arguments "pokemons", "getPokemons" and {name: pickachu}, and return object with properties: pathname, protocol, host and query with property name equal tp pikachu', () => {
    const url = getUrlWithParamsConfig("pokemons", "getPokemons", {name: 'packachu'});

    expect(url).toEqual({
      protocol: "http",
      host: "zar.hosthot.ru",
      pathname: "/api/v1/pokemons",
      query: {
        name: 'packachu'
      },
    })
  });

  test('Should take three arguments "pokemons", "getPokemon" and {id: 25}, and return object with properties: pathname, protocol, host and query with property name equal tp pikachu', () => {
    const url = getUrlWithParamsConfig("pokemons", "getPokemon", {id: 25});

    expect(url).toEqual({
      protocol: "http",
      host: "zar.hosthot.ru",
      pathname: "/api/v1/pokemon/25",
      query: {},
    })
  });

  test('Should take three arguments "pokemons", "getPokemon" and query {type: fire}, and return object with properties: pathname, protocol, host and query with property type equal to fire', () => {
    const url = getUrlWithParamsConfig("pokemons", "getPokemons", {type: "fire"});

    expect(url).toEqual({
      protocol: "http",
      host: "zar.hosthot.ru",
      pathname: "/api/v1/pokemons",
      query: {
        type: "fire"
      },
    })
  });
});
