import './App.css';

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';

// Context
import { AuthProvider } from './context/AuthContext';
import { useFetch } from './hooks/useFetch';

// Pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import MoviesDetails from './pages/MoviesDetails';
import MovieCastDetails from './pages/MovieCastDetails';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Login from './pages/Login/Login';
import { useEffect } from 'react';

const apiKey = process.env.REACT_APP_API_KEY;
const getLocalStorage = localStorage.getItem("sessionId");
const urlUserDetails = `https://api.themoviedb.org/3/account?${apiKey}&session_id=${getLocalStorage}`;

function App() {
  const { accountDetails, userDetails } = useFetch();
  const [loggedUser, setLoggedUser] = useState();
  const [imgLoggedUser, setImgLoggedUser] = useState();

  
  useEffect(() => {
    accountDetails(urlUserDetails);
  }, []);
  

  const loadingSession = userDetails === undefined;

  useEffect(() => {
    if(userDetails) {
      setLoggedUser(userDetails.username);
      setImgLoggedUser(userDetails.avatar.tmdb.avatar_path);
    }
  }, [userDetails]);

  if(loadingSession) {
    return <p>...carregando</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ loggedUser, imgLoggedUser }}>
        <BrowserRouter>
          <Navbar />
          <SearchForm />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie-details/:id" element={<MoviesDetails />} />
            <Route path="/movie-details/:id/cast" element={<MovieCastDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/company" element={<Navigate to="/movies" />} />
            <Route path="*" element={<NotFound /> } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
}

export default App;
