import Axios from 'axios';

const createAxios = (baseUrl) => {
  return Axios.create({
    baseURL: baseUrl
  });
};

const pokemonApiv2 = createAxios('https://pokeapi.co/api/v2/');

export { pokemonApiv2 };
