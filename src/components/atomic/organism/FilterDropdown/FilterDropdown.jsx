import { useState, useEffect } from "react";
import {styled} from "styled-components";
import { Text, DropdownMenu } from "@atomic";

const FilterDropdown = ({ label = 'label', items = [], onChange }) =>{
    const [selectedItem,setSelectedItem] = useState(items[0])

    const onItemSelect = ({item}) =>{
        setSelectedItem(item);
        onChange?.(item);
    }

    useEffect(() =>{
        if (!items) return;

        const defaultItem = items[0]
        onItemSelect({ item: defaultItem });
    },[items])

    return(
        <StyledDiv>
            <Text>{label}</Text>
            <div className="dropdown-wrapper">
                <DropdownMenu value={selectedItem} items={items} onItemSelect={onItemSelect} />
            </div>
        </StyledDiv>
    )
}

export default FilterDropdown

const StyledDiv = styled.div `
    display: inflex-flex;
    flex-direction: column;
    align-items:center;

    .dropdown-wrapper{
        margin-top: 1rem;

        .ant-btn{
            font-size: 1rem;
            height: 3rem;
            min-width: 20rem;
        }
    }
`