import styled from 'styled-components';
import { Row, Col } from 'antd';
import { useState } from 'react';

import { Logo, FilterDropdown, Search } from '@atomic';

import { regions, types, sortby } from'./helper.js';

import pokemonLogo from '@/assets/images/pokedex.png' ;

const Container = styled.div`
    text-align:center;
`

const StyledRow = styled(Row)`
    max-width: 1000px;
    margin: auto;
    margin-top: 2rem;
    padding: 2rem;
`

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

const SearchPage = () =>{

    const [filter,setFilter] = useState({})

    const onFilterChange = ( key, value ) => {
        setFilter((prevFilter)=>{
            return {
                ...prevFilter,
                [key]:value
            }
        })
    }

    const pokemonFilter = getFetchPokemonFilter(filter)
    console.log({pokemonFilter});

    return(
        <Container>
            <Logo src={pokemonLogo} width='300px' />
            <StyledRow>
                <Col xs={24} sm={12} md={6}>
                    <FilterDropdown label="REGION" items={regionDropdownItems} onChange={(item)=>onFilterChange('region',item)} />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <FilterDropdown label="TYPE" items={typeDropdownItems} onChange={(item)=>onFilterChange('type',item)} />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <FilterDropdown label="SORT BY" items={sortbyDropdownItems} onChange={(item)=>onFilterChange('sortby',item)} />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Search label={'SEARCH'} placeholder="TYPING..." onChange={(v)=> onFilterChange('search',v)} />
                </Col>
            </StyledRow>

        </Container>
    )
}

export default SearchPage