import {NavLink } from "react-router-dom"
import './Navbar.css'

// Hook
import { useFetch } from "../hooks/useFetch";
// import { useState } from "react";



const apiKey = process.env.REACT_APP_API_KEY;
const urlDelete = `https://api.themoviedb.org/3/authentication/session?${apiKey}`;
// console.log(urlDelete)
const Navbar = () => {
  // const [deleteSession, setDeleteSession] = useState();
  // const { logoutSession } = useFetch();

  // const endSession = async () => {
  //   // console.log('logou session')
  //   // console.log(urlDelete)
  //   logoutSession(urlDelete);
  // }

  return (
    <header className="header">
      <div className="container">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/login">Sign In</NavLink>
          {/* <NavLink to="#" onClick={() => endSession()}>Logout</NavLink> */}
        </nav>
      </div>

    </header>

  )
}

export default Navbar