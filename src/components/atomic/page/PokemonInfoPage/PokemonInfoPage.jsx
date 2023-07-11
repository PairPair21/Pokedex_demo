import { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import styled from "styled-components";
import { isEmpty } from "lodash";
import { useSearchParams, useNavigate } from "react-router-dom"
 
import { Card, PokemonInfo, PokemonData, IconToggle } from "@atomic";
import { pokemonInfo, getCardColorsByPokemonTypes, pokemonApiv2 } from "@/utils";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
`

const initial = {
    data: {},
    loading: false,
    error: null
}

const PokemonInfoPage = () =>{
    let [searchParams] = useSearchParams()
    let navigate = useNavigate()
    const id = searchParams.get('id')

    const [ state, setState ] = useState(initial)

    const fetchPokemon = async (id) => {

        setState((prev)=>({
            ...prev,
            loading:true
        }));

        let pokemon;
        let fetchError;

        try {
            const pokemonResponse = await pokemonApiv2.get(`pokemon/${id}`)
            const speciesResponse = await pokemonApiv2.get(`pokemon-species/${id}`)

            pokemon = await pokemonResponse?.data
            let species = await speciesResponse?.data

            pokemon = {
            ...pokemon,
            image:  pokemon?.sprites?.other?.dream_world?.front_default,
            about: species?.flavor_text_entries?.[0]?.flavor_text
            }

        } catch (error) {
            fetchError = error
        }

        setState((prev)=>({
            ...prev,
            data: pokemon,
            loading: false,
            error: fetchError
        }))
    }

    useEffect(() => {
    id && fetchPokemon(id);
    }, [id]);

    
    const bgColors = getCardColorsByPokemonTypes(pokemonInfo?.types)

    const goBack = () => {
        navigate('/', {replace: true})
    }

    const infoBack = <IconToggle name='back' fontSize="2rem" onClick={goBack} />
    
    if (!state.data || isEmpty(state.data)) return;

    return(
        <Wrapper>
            <Card bgColors={bgColors} left={infoBack} width="80%" maxWidth="80rem" borderRadius="1rem">
                {state.loading ? (
                    <Spin />
                    ) : (
                    <Row align="middle">
                        <Col xs={24} sm={12} md={8}>
                        <PokemonInfo pokemon={state.data} />
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                        <PokemonData pokemon={state.data} />
                        </Col>
                    </Row>
                )}
            </Card>
        </Wrapper>
    )
}

export default PokemonInfoPage