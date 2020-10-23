import React from 'react'
import { Link } from 'react-router-dom'
import "../../App.css"

function SignUn() {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Fleet</h2>
                <input type='text' placeholder="name" />
                <input type='email' placeholder="email" />
                <input type='password' placeholder="password" />
                <button className="btn waves-effect waves-light blue darken-3" >SignIn
                </button>
                <h5><Link to="/signin">Have an Account?</Link></h5>
            </div>
        </div>
    )
}

export default SignUn
