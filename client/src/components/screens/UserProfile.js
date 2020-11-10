import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from "../../App"
import M from "materialize-css"
import {useParams} from "react-router-dom"
import { WaveLoading  } from 'react-loadingg';
import { Avatar } from '@material-ui/core';

function Profile() {
    const [userProfile,setProfile]=useState(null);
    const [showFollow,setShowFollow]=useState(true);
    const {state,dispatch}=useContext(UserContext);
    const {userid} = useParams()

    useEffect(() => {
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
        setProfile(result)
       })
    }, [])

    useEffect(() => {
        if(userProfile){
        if(userProfile?.user.followers.some(follower=>follower === state._id))
            setShowFollow(false)
        else
            setShowFollow(true)
        }
    })

    useEffect(()=>{
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems,{startingTop:20,endingTop:20});
    })

    const followUser=()=>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(!showFollow)
        })
    }
    const unfollowUser=()=>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(!showFollow)
        })
    }



    if(!userProfile)
    return <WaveLoading color="#1e88e5" speed={1} />
    else
    return (
        <div style={{maxWidth:"80%", margin:"0 auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin: "18px 0px",flexWrap:"wrap"
            }}>
                <div><Avatar className= "circle responsive-img" style={{width:"160px", height:"160px", borderRadius:"80px", objectFit: "cover"}} src={userProfile?.user?.pic} /></div>
                <div style={{justifyContent:"space-around" ,textAlign:"center"}}>
                    <h4>{userProfile?.user.name}</h4>
                    <h5>{userProfile?.user.email}</h5>
                    <div style={{display:"flex", justifyContent:"space-between", textAlign:"center", minWidth:"160px"}}>
                        
                                <div style={{display:"flex",flexDirection:"column",textAlign:"center"}}>

                                <div style={{marginBottom:"-5px"}}><b>{userProfile?.posts?.length}</b></div>
                                    <div>posts</div>

                                </div>
                                <div style={{display:"flex",flexDirection:"column",textAlign:"center"}}>

                                    <div style={{marginBottom:"-5px"}}><b>{userProfile?.user?.followers?.length}</b></div>
                                    <div>followers</div>

                                </div>
                                <div style={{display:"flex",flexDirection:"column",textAlign:"center"}}>

                                    <div style={{marginBottom:"-5px"}}><b>{userProfile?.user?.following?.length}</b></div>
                                    <div>following</div>

                                </div>
                    </div>
                    {showFollow?<button style={{margin:"5px", width:"100%",marginLeft:"0"}} className="btn #1e88e5 blue darken-1" onClick={()=>{followUser()}}>follow</button> : <button  style={{margin:"5px", width:"100%",marginLeft:"0"}} className="btn #1e88e5 blue darken-1" onClick={()=>{unfollowUser()}}>unfollow</button>}
                </div>
                
            </div>
            <hr/>
            <div className="gallery" style={{marginTop:"20px"}}>
                {
                    userProfile.posts?.map(item=>
                        { 
                        return (
                        <>
                            <img key={item._id} alt={item.title} className="item modal-trigger" data-target={item._id} src={item.photo} />
                            
                                    <div id={item._id} className="modal card home-card ctr">
                                        <h5>{item.postedBy.name}</h5>

                                        <div className="card-image">
                                            <img alt="" src={item.photo} />
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
