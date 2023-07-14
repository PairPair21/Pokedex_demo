import { Button, Search, Text } from "@atomic"
import { useState } from "react"
import { styled } from "styled-components"
import { Alert } from 'antd';

const Default_NoFill = {
    data:'',
    type: 'info',
}

const FormRegister = ({onSetPage, onRegister, onClearError}) => {

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ nofillAlert, setNoFillAlert ] = useState(Default_NoFill)

    const alertNoneFill = () => {
        if(firstName && lastName && userName && password ){
            onRegister({firstName,lastName,userName,password})
            setNoFillAlert({ 
                data:'Register success',
                type: 'success',})
        }else{
            setNoFillAlert({
                data:'Need to Fill All Data',
                type: 'error',
            })
        }
    }

    const clearNoFillError = () => {
        setNoFillAlert(Default_NoFill)
    }

    return(
        <Container>
            {nofillAlert.data && (
                <WrapperAlert>
                    <Alert message={nofillAlert.data} type={nofillAlert.type} />
                </WrapperAlert>
            )}
            <Search onPressEnter={alertNoneFill} label='first name' placeholder='firstname' onChange={(v)=>{setFirstName(v); onClearError(); clearNoFillError()}}/>
            <Search onPressEnter={alertNoneFill} label='last name' placeholder='lastname' onChange={(v)=>{setLastName(v); onClearError(); clearNoFillError()}}/>
            <Search onPressEnter={alertNoneFill} label='username' placeholder='username' onChange={(v)=>{setUserName(v); onClearError(); clearNoFillError()}}/>
            <Search onPressEnter={alertNoneFill} label='password' type='password' placeholder='password' onChange={(v)=>{setPassword(v) ; onClearError(); clearNoFillError()}}/>
            <Button onClick={alertNoneFill}>Register</Button>
            <Text fontSize="0.85rem">Already have user? <Link onClick={()=>{onSetPage('login'); clearNoFillError()}}>Click here!</Link></Text>
        </Container>
    )
}

export default FormRegister

const Container = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 2.5rem;
`

const Link = styled.span`
    font-size: 0.85rem;
    cursor: pointer;
    &:hover{
        color:blue;
        border-bottom: 1px solid blue;
    } 
`
const WrapperAlert = styled.div`
    position: absolute;
    width:100%;
    top: 0;
`