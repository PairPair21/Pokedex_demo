import { Button, Search, Text } from "@atomic"
import { styled } from "styled-components"
import { useState } from "react"

const FormLogin = ({onSetPage, onLogin, onClearError}) => {

    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')

    return(
        <Container>
            <Search onPressEnter={()=>{onLogin({userName,password})}} label='username' placeholder='username' onChange={(v)=>{setUserName(v); onClearError(); }} />
            <Search onPressEnter={()=>{onLogin({userName,password})}} label='password' placeholder='password' type='password' onChange={(v)=>{setPassword(v); onClearError();}} />
            <Button onClick={()=>{onLogin({userName,password})}}>Login</Button>
            <Text fontSize="0.85rem">
                Not a member? <Link onClick={()=>{onSetPage('register')}}>Register Now</Link>
            </Text>
        </Container>
    )
}

export default FormLogin

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
