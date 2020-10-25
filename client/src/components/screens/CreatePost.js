import React from 'react'

function CreatePost() {
    return (
        <div className="card input-filed" style={{margin:"10px auto", maxWidth:"30%", padding:"20px", textAlign:"center"}}>
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Body"/>
            <div className="file-field input-field">
            <div className="btn waves-effect waves-light blue darken-1">
                <span>File</span>
                <input type="file" />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light blue darken-1" >Submit Post
                </button>
            
        </div>
    )
}

export default CreatePost
