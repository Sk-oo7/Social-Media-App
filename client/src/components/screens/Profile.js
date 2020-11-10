import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from "../../App"
import M from "materialize-css"
import { Avatar } from "@material-ui/core";
import CameraAltRoundedIcon from "@material-ui/icons/CameraAltRounded";

function Profile() {
    const [pics,setPics]=useState();
    const [image,setImage]=useState("");
    // const [url,setUrl]=useState("");
    const {state,dispatch}=useContext(UserContext);

    useEffect(() => {
       fetch("/mypost",{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
        setPics(result.mypost)
       })
    }, [])

    useEffect(()=>{
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems,{startingTop:20,endingTop:20});
    })

useEffect(() => {
    if(image){
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
            localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            dispatch({type:"UPDATE_PIC",payload:data.url})
            fetch("/updatepic",{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATE_PIC",payload:result.pic})
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}, [image])

    const uploadPic = (file) =>{
        setImage(file)
        
    }

    const deletePost =(postId)=>{
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            M.toast({html: "You just deleted a post",classes:"#ef5350 red lighten-1"})
            const newData = pics.filter(item=>{
                return item._id !== result._id
            })
            setPics(newData)
        })
    }

    return (
        <div style={{maxWidth:"80%", margin:"0 auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin: "18px 0px",flexWrap:"wrap"}}>
                <div>
                    <Avatar className= "circle responsive-img" style={{width:"160px", height:"160px", borderRadius:"80px", objectFit: "cover"}} src={state?.pic} />
                    <button
                        className=" cam"
                        style={{
                            borderRadius: "50px",
                            opacity: "0.9",
                            backgroundColor: "rgba(255, 255, 255 ,0.8)",
                            marginTop: "-40px",
                            marginLeft: "120px",
                            position: "absolute",
                            border: "none",
                            outline: "none",
                            width: "31px",
                            padding:"5px"
                            }}
                            disabled >
                        <label htmlFor="file" style={{ width: "20px", height: "20px" }}>
                            <CameraAltRoundedIcon
                            style={{ width: "20px", height: "20px", color: "black" }}
                            />
                        </label>
                        </button>
                        <input
                        type="file"
                        id="file"
                        className="file"
                        style={{ display: "none" }}
                        onChange={(e)=>{uploadPic(e.target.files[0])}}
                        />                    
                     </div>
                <div>
                    <center>
                    <h4>{state?.name}</h4>
                    <h6>{state?.email}</h6>
                    </center>
                    <div style={{display:"flex",justifyContent:"space-between" , textAlign:"center", minWidth:"160px"}}>

                                <div style={{display:"flex",flexDirection:"column",textAlign:"center"}}>

                                <div style={{marginBottom:"-5px"}}><b>{pics?pics?.length:0}</b></div>
                                    <div>posts&nbsp; &nbsp;</div>

                                </div>
                                <div style={{display:"flex",flexDirection:"column",textAlign:"center"}}>

                                    <div style={{marginBottom:"-5px"}}><b>{state?.followers?.length}</b></div>
                                    <div>followers&nbsp; &nbsp;</div>

                                </div>
                                <div style={{display:"flex",flexDirection:"column",textAlign:"center"}}>

                                    <div style={{marginBottom:"-5px"}}><b>{state?.following?.length}</b></div>
                                    <div>following</div>

                                </div>
                    </div>
                </div>
                
            </div>
            <hr/>
            <div className="gallery" style={{marginTop:"20px"}}>
                {
                    pics?.map(item=>
                        { 
                        return (
                        <>
                            <img key={item._id} alt={item.title} className="item modal-trigger" data-target={item._id} src={item.photo} />
                            
                                    <div id={item._id} className="modal card home-card ctr">
                                        <h5>{item.postedBy.name}<button className="btn-flat modal-close" onClick={()=>{deletePost(item._id)}} style={{float:"right"}}><i className="material-icons">delete</i></button></h5>

                                        <div className="card-image">
                                            <img className= "responsive-img" alt="" src={item.photo} />
                                        </div>
                                        <div className="card-content">
                                            <h6>{item.title}</h6>
                                            <p>{item.body}</p>
                                        </div>
                        
                                    </div>
                            
                        </>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Profile
