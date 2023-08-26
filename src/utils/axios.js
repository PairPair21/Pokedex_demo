import Axios from 'axios';

const createAxios = (baseUrl) => {
  return Axios.create({
    baseURL: baseUrl
  });
};

const pokemonApiv2 = createAxios('https://pokeapi.co/api/v2/');
const pokemonUser = createAxios('https://distinct-uniform-dog.cyclic.cloud/');

export { pokemonApiv2, pokemonUser };
