import React, { useState } from 'react';
import './App.css';
import Home from './views/Home';
import Nav from './components/Nav'
import Users from './views/Users'
import Dogs from './views/Dogs'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoadingOverlay from './components/LoadingOverlay'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:5142/graphql/',
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
          <LoadingOverlay showLoadingOverlay={showLoadingOverlay} handleCloseLoadingOverlay={handleCloseLoadingOverlay} />
          <Nav />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/users/:userId" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/dogs" element={<Dogs handleOpenLoadingOverlay={handleOpenLoadingOverlay} handleCloseLoadingOverlay={handleCloseLoadingOverlay} />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </ApolloProvider>
  );
}

export default App;
