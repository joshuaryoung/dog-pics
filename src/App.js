import React, { useState } from 'react';
import './App.css';
import Home from './views/Home';
import Nav from './components/Nav'
import Users from './views/Users'
import Dogs from './views/Dogs'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoadingOverlay from './components/LoadingOverlay'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/system';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});


function App() {
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const handleCloseLoadingOverlay = () => {
    console.log('closeLoadingOvelay')
    setShowLoadingOverlay(false)
  }
  const handleOpenLoadingOverlay = () => {
    console.log('handleOpenLoadingOverlay')
    setShowLoadingOverlay(true)
  }

  return (
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <div className='dogs-app'>
            <LoadingOverlay showLoadingOverlay={showLoadingOverlay} handleCloseLoadingOverlay={handleCloseLoadingOverlay} />
            <Nav />
            <Container maxWidth="xl">
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/users/:userId" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/dogs" element={<Dogs handleOpenLoadingOverlay={handleOpenLoadingOverlay} handleCloseLoadingOverlay={handleCloseLoadingOverlay} />} />
              </Routes>
            </Container>
          </div>
        </BrowserRouter>
      </React.StrictMode>
    </ApolloProvider>
  );
}

export default App;
