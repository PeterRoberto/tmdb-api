import {NavLink, useNavigate } from "react-router-dom"
import './Navbar.css'

// Hook
import { useFetch } from "../hooks/useFetch";
import { AuthValue } from "../context/AuthContext";

const Navbar = () => {
  const { loggedUser } = AuthValue();
  
  return (
    <header className="header">
      <div className="container">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>

          {!loggedUser && (
            <>
              <NavLink to="/login">Sign In</NavLink>
            </>
          )}
          

          {/* {getSessionStorage !== '' && (
            <>
              <NavLink to="/login">Sign In</NavLink>
            </>
          )} */}

          {/* <NavLink to="#" onClick={() => endSession()}>Logout</NavLink> */}
        </nav>
      </div>

    </header>

  )
}

export default Navbar