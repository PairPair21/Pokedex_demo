import {styled} from 'styled-components';
import { Row, Col, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { filter } from 'lodash';

import { Logo, FilterDropdown, Search, PokemonCard } from '@atomic';

import { regions, types, sortby, filterBySearch, filterByType, sortingBy } from'./helper.js';
import { pokemonApiv2, pokemonUser,useToken } from '@/utils';

import pokemonLogo from '@/assets/images/pokedex.png' ;

const regionDropdownItems = regions.map((r) => {
    return {
        ...r,
        key: r?.name,
        value: r?.name,
        label: `${r?.name} (${r?.offset} - ${r?.limit + r?.offset})`
    }
})

const typeDropdownItems = types.map((t)=>({
    key: t,
    value:t,
    label:t,
}))

const sortbyDropdownItems = sortby.map((s)=>({
    key: s,
    value:s,
    label:s,
}))

const getFetchPokemonFilter= (filter) => {
    return filter
}

const getQueryString = (region) =>{
    if(!region) return null;
    let query = new URLSearchParams()

    query.append('limit', region?.limit);
    query.append('offset', region?.offset);

    return query.toString()
}

const getPokemonList = (pokemons=[], filters={}) => {

    const { search, type, sortBy } = filters;

    const pokemonLists = filter( pokemons,( pokemon ) => {
        let remove = false

        if (search && !filterBySearch(pokemon, search)){
            remove = true
        }

        if (type && type?.value !== 'all types' && !filterByType( pokemon, type?.value )){
            remove = true
        }

        return !remove // false-remove true-save 
    } )

    const sortedPokemonList = pokemonLists.sort(sortingBy(sortBy?.value))

    const result = sortedPokemonList.map((pokemon)=>{
        return {
            ...pokemon,
            image:  pokemon?.sprites?.other?.dream_world?.front_default
        }
    })

    return result
}

const initial = {
    data:[],
    loading: false,
    error:null
} 

const SearchPage = ({clearToken, user, saveToken}) =>{

    const [filters,setFilters] = useState({})
    const [ state, setState ] = useState(initial)
    const {token} = useToken();


    const onFilterChange = ( key, value ) => {
        setFilters((prevFilter)=>{
            return {
                ...prevFilter,
                [key]:value
            }
        })
    }

    const queryString = getQueryString(filters?.region)
    const pokemonLists = getPokemonList(state?.data, filters)

    const pokemonFilter = getFetchPokemonFilter(filter)

    const fecthPokemonList = async () => {
        if (!queryString) return;
        let pokemonList = [];
        let fetchError = null;
        
        setState((prev)=>({
            ...prev,
            loading:true
        }));

        try {
            const response = await pokemonApiv2.get(`pokemon?${queryString}`)
            const pokemonResults = response?.data?.results || []

            for (let pokemon of pokemonResults){
                const response = await pokemonApiv2.get(`pokemon/${pokemon?.name}`)
                const monster = await response?.data
                await pokemonList.push({...monster,score:0})
            }
        } catch (error) {
            fetchError = error
        }

        try {

            const response = await pokemonUser.get(`pokemon/score/all`,{headers:{Authorization:`bearer ${token}`,}})
            if(response?.data?.data){
                const pokemonResults = response?.data?.data || []
                saveToken(response.data._token)
                pokemonResults.forEach((item)=>{
                    let indexTarget = pokemonList.findIndex((el)=>el.id == item.pokemon_id)
                    pokemonList[indexTarget] = {
                        ...pokemonList[indexTarget],
                        score:item.score
                    }
                })
            }

        } catch (error) {
            fetchError = error
        }

        setState((prev)=>({
            ...prev,
            loading: false,
            data: pokemonList,
            error: fetchError,
        }))
    }

    const onVote = async (id) => {
        let data = {
            "item" : [
                {
                    "id" : id
                }
            ]
        }
       const response = await pokemonUser.post(`pokemon/vote`,data, {
            headers:{
                Authorization:`bearer ${token}`,
            }
        })
        console.log('response',response);
        if(response.data.success){
            fecthPokemonList()
            saveToken(response.data._token)
        }
    }

    useEffect(() => { 
        queryString && fecthPokemonList();
    },[queryString])

    return(
        <Container>
            <HeaderContainer>
                <Logo src={pokemonLogo} width='250px' />
                <RMenu>
                    <div>{user?.[0].firstName}</div>
                    <Link onClick={clearToken}>Logout</Link>
                </RMenu>
            </HeaderContainer>
            <StyledRow>
                <Col xs={24} sm={12} md={6}>
                    <FilterDropdown label="REGION" items={regionDropdownItems} onChange={(item)=>onFilterChange('region',item)} />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <FilterDropdown label="TYPE" items={typeDropdownItems} onChange={(item)=>onFilterChange('type',item)} />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <FilterDropdown label="SORT BY" items={sortbyDropdownItems} onChange={(item)=>onFilterChange('sortBy',item)} />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Search label={'SEARCH'} placeholder="TYPING..." onChange={(v)=> onFilterChange('search',v)} />
                </Col>
            </StyledRow>
            <PokemonContainer>
                {state?.loading ? (<Spin/>) : ([...pokemonLists].map((pokemon)=><PokemonCard key={pokemon?.id} pokemon={pokemon} onVote={onVote} />)) }
            </PokemonContainer>

        </Container>
    )
}

export default SearchPage

const Container = styled.div`
    text-align:center;
    padding: 2rem 5rem;
`

const StyledRow = styled(Row)`
    max-width: 1000px;
    margin: auto;
    margin-top: 2rem;
    padding: 2rem;
`

const PokemonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2rem;
    justify-content: space-around;
`

const HeaderContainer = styled.div`
    position: relative;
`

const RMenu = styled.div`
    position: absolute;
    top: 28px;
    right: 5rem;
    display: flex;
    align-items: center;
    gap: 1rem
`

const Link = styled.span`
    font-size: 0.85rem;
    color:gray;
    cursor: pointer;
    &:hover{
        color:blue;
        border-bottom: 1px solid blue;
    } 
`