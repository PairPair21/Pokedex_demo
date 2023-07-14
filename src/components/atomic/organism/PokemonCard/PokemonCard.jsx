import {styled}  from "styled-components";
import { useNavigate } from "react-router-dom";

import { Card, Text, IconToggle } from "@atomic"; 

import { getCardColorsByPokemonTypes } from "@/utils";

const PokemonCard = ({ pokemon, onVote }) => {
    let navigate = useNavigate();

    const pokemonId = <span>No.{ pokemon?.id }</span>

    const bgColors = getCardColorsByPokemonTypes(pokemon?.types)

    const handleOnIconInfoClick = () => {
        navigate(`/pokemon?id=${pokemon?.id}`, { replace: true })
    }

    const checkScore = (score) => {
        return score > 1000 ? `${score/1000} K` : score
    }

    const icons = (
        <ContainerHeartStyle>
            <Score fontSize='0.8rem'>{ pokemon.score > 0 && checkScore(pokemon.score) }</Score>
            <IconToggle name='heart' onClick={()=>{onVote(pokemon.id)}} active={pokemon.score>0} margin={'0 0.3rem 0 0'} />
            <IconToggle name='info' isColorChangre={false} onClick={handleOnIconInfoClick} />
        </ContainerHeartStyle>
    )

    return(
        <Container>
            <Card left={pokemonId} right={icons} width="22rem" padding="1rem" borderRadius="1rem" bgColors={bgColors} hoverable >
                <StyledImg>
                    <img src={pokemon?.image} width={'100%'} height="150px" />
                </StyledImg>
                <Text fontsize="1.2rem">
                    {pokemon?.name}
                </Text>
            </Card>
        </Container>
    )
}

export default PokemonCard

const Container = styled.div`
    margin: 2rem;
`

const StyledImg = styled.div`
    padding: 2rem;
`
const Score = styled.span`
    font-size: 0.8rem;
    margin-right:0.3rem;
`
const ContainerHeartStyle = styled.div`
    display:flex;
    align-items:center;
`