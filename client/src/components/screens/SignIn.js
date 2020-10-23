import React from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Fleet</h2>
                <input type='email' placeholder="email"  />
                <input type='password' placeholder="password" />
                <button className="btn waves-effect waves-light blue darken-3" >SignIn
                </button>
                <h5><Link to="/signup">New User?</Link></h5>
            </div>
        </div>
    )
}

export default SignIn
