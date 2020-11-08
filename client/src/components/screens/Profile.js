import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from "../../App"
import M from "materialize-css"

function Profile() {
    const [pics,setPics]=useState();
    const {state}=useContext(UserContext);

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

    const deletePost =(postId)=>{
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            M.toast({html: "You just deleted a post",classes:"#ef5350 red lighten-1"})
            const newData = pics.filter(item=>{
                return item._id !== result._id
            })
            setPics(newData)
        })
    }

    return (
        <div style={{maxWidth:"80%", margin:"0 auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin: "18px 0px",flexWrap:"wrap"
            }}>
                <div>
                    <img className= "circle responsive-img" style={{width:"160px", height:"160px", borderRadius:"80px", objectFit: "cover"}} 
                src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="" /></div>
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
