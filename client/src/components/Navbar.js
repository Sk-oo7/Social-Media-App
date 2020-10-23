import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

function navbar() {
    return (
        <div>
            <nav>
    <div className="nav-wrapper dark blue darken-3">
      <Link to="/" className="brand-logo">Fleet</Link>
      <ul id="" className="right hide-on-med-and-down">
        <li><Link to="/signin">SignIn</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  </nav>
        </div>
    )
}

export default navbar
