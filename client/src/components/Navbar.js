import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

function Navbar() {
  const [show,setShow]=useState(false);

    return (
        <div>
            <nav>
              <div className="nav-wrapper dark blue darken-3">
                <Link to="/" className="brand-logo center">Fleet</Link>
                <Link className='sidenav-trigger right' to="#" data-target='' onClick={()=>setShow(!show)}><i className="material-icons">menu</i></Link>
                {!show && <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><Link to="/signin">SignIn</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                </ul>}
              </div>
            </nav>

            {show && <nav>
              <div className="nav-wrapper white" style={{display:"flex",justifyContent:"space-around"}}>
                <ul className="show-on-medium-and-down">
                <li><Link to="/signin"><span className="blue-text text-darken-2">SignIn</span></Link></li>
                <li><Link to="/signup"><span className="blue-text text-darken-2">SignUp</span></Link></li>
                <li><Link to="/profile"><span className="blue-text text-darken-2">Profile</span></Link></li>
                </ul>
              </div>
            </nav>}
        </div>
    )
}

export default Navbar
