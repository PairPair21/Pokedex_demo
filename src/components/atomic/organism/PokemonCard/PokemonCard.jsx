import styled  from "styled-components";
import { useNavigate } from "react-router-dom";

import { Card, Text, IconToggle } from "@atomic"; 

import { getCardColorsByPokemonTypes } from "@/utils";

const Container = styled.div`
    margin: 2rem;
`

const StyledImg = styled.div`
    padding: 2rem;
`

const PokemonCard = ({ pokemon} ) => {
    let navigate = useNavigate();

    const pokemonId = <span>No.{ pokemon?.id }</span>

    const bgColors = getCardColorsByPokemonTypes(pokemon?.types)

    const handleOnIconInfoClick = () => {
        navigate(`/pokemon?id=${pokemon?.id}`, { replace: true })
    }

    const icons = (
        <div>
            <IconToggle name='heart' margin={'0 0.3rem 0 0'} />
            <IconToggle name='info' isColorChangre={false} onClick={handleOnIconInfoClick} />
        </div>
    )

    return(
        <Container>
            <Card left={pokemonId} right={icons} width="22rem" padding="1rem" borderRadius="1rem" bgColors={bgColors} hoverable >
                <StyledImg>
                    <img src={pokemon?.images} width={'100%'} />
                </StyledImg>
                <Text fontsize="1.2rem">
                    {pokemon?.name}
                </Text>
            </Card>
        </Container>
    )
}

export default PokemonCard