import { styled } from 'styled-components';
import { Logo } from '@atomic';
import pokemonLogo from '@/assets/images/pokedex.png' ;

import { useState } from "react";
import { FormLogin, FormRegister } from "@atomic";
import { pokemonUser } from '@/utils';
import { Alert } from 'antd';

const Default_Alert = {
    data:'',
    type: 'info',
}


const LoginPage = ({setToken,setUser}) =>{

    const [ page,setPage ] = useState('login')
    const [ alert, setAlert ] = useState(Default_Alert)

    const onSetPage = (call) =>{
        setPage(call)
        onClearError(Default_Alert)
    }

    const onRegister = async (data) => {

        const response = await pokemonUser.post(`register`,data)
        if(response.data.success === true){
            setAlert({
                data: 'Success Register' ,
                type: 'success',
            })
            onClearError(Default_Alert)
        } else {
            setAlert({
                data: response.data.data ,
                type: 'error',
            })
        }
    }

    const onLogin = async (data) => {

        const response = await pokemonUser.post(`login`,data)
        console.log('response',response);
        if(response.data.success === true){
            onClearError(Default_Alert)
            setToken(response.data._token)
            setUser(response.data.data)
        } else {
            setAlert({
                data: response.data.data ,
                type: 'error',
            })
        }
    }

    const onClearError = () => {
        setAlert(Default_Alert)
    }

    return (
        <Wrapper>
            {alert.data && (
                <WrapperAlert>
                    <Alert message={alert.data} type={alert.type} />
                </WrapperAlert>
            )}
            <Logo src={pokemonLogo} width='250px' />
            {page === 'login' && (
                <FormLogin onSetPage={onSetPage} onLogin={onLogin} onClearError={onClearError}/>
            )}
            {page === 'register' && (
                <FormRegister onSetPage={onSetPage} onRegister={onRegister} onClearError={onClearError}/>
            )}
        </Wrapper>
    )
}

export default LoginPage

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
    gap: 2rem;
`

const WrapperAlert = styled.div`
    position: absolute;
    width:100%;
    top: 0;
`