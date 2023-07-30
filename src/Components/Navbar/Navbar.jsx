import React from 'react'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({userData, logout}) {
  console.log(userData);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand fw-bolder" to="/">Game Over</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

    {userData  ?
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <NavLink className={({isActive})=> isActive == true ? "nav-link active": "nav-link"} to="allGames">All Games</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive})=>isActive ? "nav-link active" : "nav-link"} to="allPlatforms">Platforms</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={({isActive})=>isActive ? "nav-link active" : "nav-link"} to="allCategories">Categories</NavLink>
          </li>
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            sort-by
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="releaseDateSort">release-date</NavLink></li>
            <li><NavLink className="dropdown-item" to="popularitySort">popularity</NavLink></li>
            <li><NavLink className="dropdown-item" to="alphabeticalSort">alphabetical</NavLink></li>
            <li><NavLink className="dropdown-item" to="relevanceSort">relevance</NavLink></li>
          </ul>
        </li>
          
        </ul> : 
        <ul className="navbar-nav  mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className={({isActive})=>isActive ? "nav-link active" : "nav-link"} to="/">Home</NavLink>
          </li>
        </ul>
        }
          
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        {userData ? 
        <>
          <li>
              <button type="button" className="btn logout rounded-pill px-4" onClick={logout}>Logout</button>
          </li>
          </> : 
          <>
           <li>
            <NavLink to="/signin" type="button" className="btn signin rounded-pill px-4">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup" type="button" className="btn signup rounded-pill px-4">Register</NavLink>
          </li>
          </>
          }
          
        </ul>

    </div>
  </div>
</nav>
  )
}
