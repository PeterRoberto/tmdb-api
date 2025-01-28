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

function App() {
  const getSessionStorage = localStorage.getItem('sessionId');
  const [currentSession, setCurrentSession] = useState(undefined);
  const { authenticateUser } = useFetch();

  const loadingSession = currentSession === undefined;

  useEffect(() => {
    setCurrentSession(getSessionStorage);
  }, [authenticateUser]);

  if(loadingSession) {
    return <p>...carregando</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ currentSession }}>
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
