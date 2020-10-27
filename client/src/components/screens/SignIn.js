import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from "materialize-css"

function SignIn() {
    const history = useHistory()
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const postData=()=>{
        if(email!=="" && password!=="" && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#ef5350 red lighten-1"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error)
            M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
            else{
                M.toast({html: "Successfully Signed In",classes:"#26a69a teal lighten-1"})
                history.push("/")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Fleet</h2>
                <input type='email' placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light blue darken-3" onClick={postData}>SignIn
                </button>
                <h5><Link to="/signup">New User?</Link></h5>
            </div>
        </div>
    )
}

export default SignIn
