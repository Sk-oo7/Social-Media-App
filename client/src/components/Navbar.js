import React, { useState,useContext } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from "../App"
import "../App.css"

function Navbar() {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext)

  const renderList =()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><a className="btn #0d47a1 blue darken-4" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}>Logout</a></li>
      ]
    }
    else{
      return [<li><Link to="/signin">SignIn</Link></li>,
      <li><Link to="/signup">Signup</Link></li>]
    }
  }
  const renderList2 =()=>{
    if(state){
      return [
        <li><Link to="/profile"><span className="blue-text text-darken-2">Profile</span></Link></li>,
        <li><a className="btn #0d47a1 blue darken-4" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}>Logout</a></li>
      ]
    }
    else{
      return [
        <li><Link to="/signin"><span className="blue-text text-darken-2">SignIn</span></Link></li>,
        <li><Link to="/signup"><span className="blue-text text-darken-2">SignUp</span></Link></li>
    ]
    }
  }
  const [show,setShow]=useState(false);

    return (
        <div>
            <nav>
              <div className="nav-wrapper dark blue darken-3">
                <Link to={state? "/" : "/signin"} className="brand-logo center">Fleet</Link>
                <Link className='sidenav-trigger right' to="#" data-target='' onClick={()=>setShow(!show)}><i className="material-icons">menu</i></Link>
                {!show && <ul id="nav-mobile" className="right hide-on-med-and-down">
                  {renderList()}
                </ul>}
              </div>
            </nav>

            {show && <nav>
              <div className="nav-wrapper white" style={{display:"flex",justifyContent:"space-around"}}>
                <ul className="show-on-medium-and-down">
                {renderList2()}
                </ul>
              </div>
            </nav>}
        </div>
    )
}

export default Navbar
