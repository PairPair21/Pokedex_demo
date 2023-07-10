import { useState } from "react"; 
import  styled  from "styled-components";

import { Icon } from "@atomic";

const StyledIcon = styled(Icon)`
    margin: ${({margin}) => margin };
    svg {
        fill: ${({ active }) => (active ? '#D03E5C' : 'currentColor') };
        font-size: ${({ fontSize })=> fontSize || '1.3rem'} ;
    }
`

const IconToggle = ({ name, margin, isColorChangre = true, onClick, ...props }) => {
    
    const [active, setActive] = useState(false)

    const handleOnClick = () =>{
        isColorChangre && setActive(!active);
        onClick?.();
    }

    return (
        <StyledIcon name={name} margin={margin} active={active} onClick={handleOnClick} {...props} />
    )
}

export default IconToggle