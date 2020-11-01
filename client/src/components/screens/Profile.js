import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from "../../App"

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
    return (
        <div style={{maxWidth:"80%", margin:"0 auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin: "18px 0px",flexWrap:"wrap"
            }}>
                <div><img style={{width:"160px", height:"160px", borderRadius:"80px", objectFit: "cover"}} 
                src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="" /></div>
                <div>
                    <h4>{state?.name}</h4>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div><h6>10 posts &nbsp;</h6></div>
                    <div><h6>100 followers &nbsp;</h6></div> 
                    <div><h6>102 following &nbsp;</h6></div> 
                    </div>
                </div>
                
            </div>
            <hr/>
            <div className="gallery" style={{marginTop:"20px"}}>
                {
                    pics?.map(item=>{
                        return (<img key={item._id} alt={item.title} className="item" src={item.photo} />)
                    })
                }
            </div>
        </div>
    )
}

export default Profile
