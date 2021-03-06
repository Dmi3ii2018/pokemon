const config = {
  client: {
    server: {
      protocol: 'http',
      host: 'zar.hosthot.ru',
    },
    endpoint: {
      getPokemons: {
        method: 'GET',
        url: {
          pathname: '/api/v1/pokemons'
        },
        params: [],
      },
      getPokemon: {
        method: 'GET',
        url: {
          pathname: '/api/v1/pokemon/{id}',
        },
        params: ["id"],
      }
    }
  }
}

export default config;