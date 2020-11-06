import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from "../../App"
import M from "materialize-css"
import {useParams} from "react-router-dom"
import { WaveLoading  } from 'react-loadingg';

function Profile() {
    const [userProfile,setProfile]=useState(null);
    const {state}=useContext(UserContext);
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

    useEffect(()=>{
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems,{startingTop:20,endingTop:20});
    })
    if(!userProfile)
    return <WaveLoading color="#1e88e5" speed={1} />
    else
    return (
        <div style={{maxWidth:"80%", margin:"0 auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin: "18px 0px",flexWrap:"wrap"
            }}>
                <div><img style={{width:"160px", height:"160px", borderRadius:"80px", objectFit: "cover"}} 
                src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="" /></div>
                <div>
                    <h4>{userProfile?.user.name}</h4>
                    <h5>{userProfile?.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div><h6>{userProfile?.posts?.length} posts &nbsp;</h6></div>
                    <div><h6>100 followers &nbsp;</h6></div> 
                    <div><h6>102 following &nbsp;</h6></div> 
                    </div>
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
