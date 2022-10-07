import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './views/Home';
import Nav from './components/Nav'
import Users from './views/Users'
import Dogs from './views/Dogs'
import Login from './views/Login'
import Signup from './views/Signup'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoadingOverlay from './components/LoadingOverlay'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getJwtFromLocalStorage } from './security';
import { PrincipalQuery } from './graphql/users.gql';

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
  id: null
}

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    cache: new InMemoryCache(),
    headers: {
      authorization: getJwtFromLocalStorage()
    }
  });

  const [principal, setPrincipal] = useState(defaultPrincipal)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)

  useEffect(() => {
    async function getPrincipal() {
      try {
        const jwt = getJwtFromLocalStorage()

        if (!jwt) {
          return
        }
        const res = await client.query({ query: PrincipalQuery })
        
        const { data: resData } = res ?? {}
        const { me } = resData ?? {}
        const { firstName, lastName, id } = me ?? {}

        setPrincipal(state => {
          return {
            id,
            firstName,
            lastName
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
    getPrincipal()
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
                  <Route path="/users/:userId" element={<Users principal={principal} />} />
                  <Route path="/users" element={<Users principal={principal} />} />
                  <Route path="/signup" element={<Signup />} />
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
