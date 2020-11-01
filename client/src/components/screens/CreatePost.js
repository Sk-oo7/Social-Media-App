import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import M from "materialize-css"

function CreatePost() {
    const history = useHistory()
    const[title,setTitle]=useState("");
    const[body,setBody]=useState("");
    const[image,setImage]=useState("");
    const[url,setUrl]=useState("");

    useEffect(()=>{
        if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
            else{
                M.toast({html: "You just posted something",classes:"#26a69a teal lighten-1"})
                history.push("/profile")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    // eslint-disable-next-line
    },[url]);
    const postDetails=()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","fleet-app")
        data.append("cloud_name","fleet")
        fetch("	https://api.cloudinary.com/v1_1/fleet/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    return (
        <div className="card input-field" style={{margin:"10px auto", maxWidth:"30%", minWidth:"200px", padding:"20px", textAlign:"center"}}>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <input type="text" placeholder="Body" value={body} onChange={(e)=>{setBody(e.target.value)}} />
            <div className="file-field input-field">
            <div className="btn waves-effect waves-light blue darken-1">
                <span>File</span>
                <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light blue darken-1" onClick={postDetails}>Submit Post
                </button>
            
        </div>
    )
}

export default CreatePost
