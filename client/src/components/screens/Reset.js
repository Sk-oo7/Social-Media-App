import React, { useState, useContext} from 'react'
import {UserContext} from "../../App"
import { Link,useHistory } from 'react-router-dom'
import M from "materialize-css"

function Reset() {
    const history = useHistory()
    const [email,setEmail]=useState("");

    const postData=()=>{
        if(email!=="" && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#ef5350 red lighten-1"})
            return
        }
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
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
                <input type='email' placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button className="btn waves-effect waves-light blue darken-3" onClick={postData}>Send Email
                </button>
            </div>
        </div>
    )
}

export default Reset
