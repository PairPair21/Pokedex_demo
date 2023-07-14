import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PokemonInfoPage, SearchPage, LoginPage } from '@atomic';
import { useToken } from './utils';

function App() {

  const {token, saveToken, clearToken, user, saveUser} = useToken('')

  if(!token){
    return <LoginPage setToken={saveToken} setUser={saveUser} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchPage saveToken={saveToken} clearToken={clearToken} user={user} />} />
        <Route path='/pokemon' element={<PokemonInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
