import React, { useState,useContext, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from "../App"
import "../App.css"
import M from "materialize-css"

function Navbar() {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext)

  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  },[])

  const renderList =()=>{
    if(state){
      return [
        <li key="abc9"><Link to="/explore">Explore</Link></li>,
        <li key="abc1"><Link to="/profile">Profile</Link></li>,
        <li key="abc2"><a className="btn #0d47a1 blue darken-4" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}>Logout</a></li>
      ]
    }
    else{
      return [<li key="abc3"><Link to="/signin">SignIn</Link></li>,
      <li key="abc4"><Link to="/signup">Signup</Link></li>]
    }
  }
  const renderList2 =()=>{
    if(state){
      return [
        <li><div className="user-view">
      <div className="background">
        <img style={{width:"500px"}} src="https://materializecss.com/images/office.jpg"/>
      </div>
      <a href="#user"><img className="circle" src={state?.pic}/></a>
      <span className="name">{state?.name}</span>
      <span className="email">{state?.email}</span>
    </div></li>,
      
        <li key="abc10"><Link to="/explore" className="sidenav-close"><span className="blue-text text-darken-2">Explore</span></Link></li>,
        <li key="abc5"><Link to="/profile"  className="sidenav-close"><span className="blue-text text-darken-2">Profile</span></Link></li>,
        <li key="abc6"><a className="btn #0d47a1 blue darken-4 sidenav-close" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}>Logout</a></li>
      ]
    }
    else{
      return [
        <li key="abc7"><Link to="/signin"><span className="blue-text text-darken-2">SignIn</span></Link></li>,
        <li key="abc8"><Link to="/signup"><span className="blue-text text-darken-2">SignUp</span></Link></li>
    ]
    }
  }

    return (
        <div>

            <nav className="dark blue darken-3">
              <div className="nav-wrapper container">
                <Link to={state? "/" : "/signin"} className="brand-logo">Fleet</Link>
                <Link data-target="mobile-demo" className='sidenav-trigger' to="#" ><i className="material-icons">menu</i></Link>

                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  {renderList()}
                </ul>
   
              </div>
            </nav>

                <ul className="sidenav" id="mobile-demo">
                {renderList2()}
                </ul>

        </div>
    )
}

export default Navbar
