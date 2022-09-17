import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './views/Home';
import Nav from './components/Nav'
import Users from './views/Users'
import Dogs from './views/Dogs'
import Login from './views/Login'
import UserCreate from './views/UserCreate'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoadingOverlay from './components/LoadingOverlay'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getJwtFromCookies } from './security';
import jwtDecode from 'jwt-decode';
import { PrincipalQuery } from './graphql/users.gql';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5c668b',
      dark: '#5c668b'
    },
    secondary: {
      main: '#2e2e2e',
      dark: '#2e2e2e'
    },
    background: {
      main: '#2e2e2e',
      dark: '#2e2e2e'
    },
    text: {
      main: 'white',
      dark: 'white'
    }
  },
})

export const defaultPrincipal = {
  firstName: '',
  lastName: '',
  jwt: '',
  id: null
}

function App() {
  const [principal, setPrincipal] = useState(defaultPrincipal)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)

  useEffect(() => {
    async function getJwt() {
      const jwt = getJwtFromCookies()
      if (jwt) {
        const decodedJwt = jwtDecode(jwt) ?? {}
        const id = parseInt(decodedJwt.id)

        try {
          const res = await client.query({ query: PrincipalQuery, variables: { idIn: id } })
          
          const { data: resData } = res ?? {}
          const { userById } = resData ?? {}
          const { firstName, lastName } = userById ?? {}

          setPrincipal(state => {
            return {
              id,
              firstName,
              lastName,
              jwt
            }
          })
        } catch (error) {
          console.error(error)
        }
      }
    }
    getJwt()
  }, [])

  const handleCloseLoadingOverlay = () => {
    setShowLoadingOverlay(false)
  }
  const handleOpenLoadingOverlay = () => {
    setShowLoadingOverlay(true)
  }

  return (
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <div className='dogs-app' style={{ backgroundColor: darkTheme.palette.background.main, color: darkTheme.palette.text.dark }}>
              <LoadingOverlay showLoadingOverlay={showLoadingOverlay} handleCloseLoadingOverlay={handleCloseLoadingOverlay} />
              <Nav principal={principal} setPrincipal={setPrincipal} />
              <Container maxWidth="xl">
                <Routes>
                  <Route index path="/" element={<Home />} />
                  <Route path="/users/:userId" element={<Users />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/user-create" element={<UserCreate />} />
                  <Route path="/login" element={<Login principal={principal} setPrincipal={setPrincipal} />} />
                  <Route path="/dogs" element={<Dogs handleOpenLoadingOverlay={handleOpenLoadingOverlay} handleCloseLoadingOverlay={handleCloseLoadingOverlay} principal={principal} />} />
                </Routes>
              </Container>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    </ApolloProvider>
  );
}

export default App;
