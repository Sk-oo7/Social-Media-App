import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import "../../App.css"
import M from "materialize-css"

function SignUp() {
    const history = useHistory()
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const postData=()=>{
        if(email!=="" && password!=="" && name!=="" && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#ef5350 red lighten-1"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
            else{
                M.toast({html: data.message,classes:"#26a69a teal lighten-1"})
                history.push("/signin")
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
                <input type='text' placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type='email' placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light blue darken-3" onClick={postData}>SignIn
                </button>
                <h5><Link to="/signin">Have an Account?</Link></h5>
            </div>
        </div>
    )
}

export default SignUp
