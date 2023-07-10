import { Row, Col } from "antd";
import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom"
 
import { Card, PokemonInfo, PokemonData, IconToggle } from "@atomic";
import { pokemonInfo, getCardColorsByPokemonTypes } from "@/utils";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
`

const PokemonInfoPage = () =>{
    let [searchParams] = useSearchParams()
    let navigate = useNavigate()
    const id = searchParams.get('id')
    const bgColors = getCardColorsByPokemonTypes(pokemonInfo?.types)

    const goBack = () => {
        navigate('/', {replace: true})
    }

    const infoBack = <IconToggle name='back' fontSize="2rem" onClick={goBack} />

    return(
        <Wrapper>
            <Card bgColors={bgColors} left={infoBack} width="80%" maxWidth="80rem" borderRadius="1rem">
                <Row>
                    <Col Col xs={24} sm={12} md={8} >
                        <PokemonInfo pokemon={pokemonInfo} />
                    </Col>
                    <Col Col xs={24} sm={12} md={16} >
                        <PokemonData pokemon={pokemonInfo} />
                    </Col>
                </Row>
            </Card>
        </Wrapper>
    )
}

export default PokemonInfoPage