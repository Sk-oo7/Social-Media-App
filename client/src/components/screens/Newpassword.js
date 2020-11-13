import React, { useState, useContext} from 'react'
import {UserContext} from "../../App"
import { Link,useHistory, useParams } from 'react-router-dom'
import M from "materialize-css"

function NewPassword() {

    const history = useHistory()
    const [password,setPassword]=useState("");
    const {token} =useParams();
    console.log(token)

    const postData=()=>{
        fetch("/newpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
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
                
                <input type='password' placeholder="new password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light blue darken-3" onClick={postData}>Change Password
                </button>
            </div>
        </div>
    )
}

export default NewPassword
