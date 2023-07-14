import  {styled}  from "styled-components";

import { Icon } from "@atomic";

const IconToggle = ({ name, margin, onClick, active, ...props }) => {

    const handleOnClick = () =>{
        onClick?.();
    }

    return (
        <StyledIcon name={name} margin={margin} active={active} onClick={handleOnClick} {...props} />
    )
}

export default IconToggle

const StyledIcon = styled(Icon)`
    margin: ${({margin}) => margin };
    svg {
        fill: ${({ active }) => (active ? '#D03E5C' : 'currentColor') };
        font-size: ${({ fontSize })=> fontSize || '1.3rem'} ;
    }
`
