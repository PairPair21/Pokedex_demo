import Axios from 'axios';

const createAxios = (baseUrl) => {
  return Axios.create({
    baseURL: baseUrl
  });
};

const pokemonApiv2 = createAxios('https://pokeapi.co/api/v2/');
const pokemonUser = createAxios('https://zany-tan-lamb-wrap.cyclic.app/');

export { pokemonApiv2, pokemonUser };
