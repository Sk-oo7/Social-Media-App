import React, { useEffect, useState, useContext } from 'react'
import CreatePost from"./CreatePost"
import {UserContext} from "../../App"

function Home() {
    const [data,setData] = useState([]);
    const{state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch("/allpost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    },[])

    const likePost = (id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const unlikePost = (id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id == result._id)
                    return result
                else
                    return item
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="home">
            <CreatePost />
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img alt="" src={item.photo} />
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id)?<i className="material-icons" style={{color:"red"}} onClick={()=>{unlikePost(item._id)}} >favorite</i> : <i className="material-icons" style={{color:"red"}} onClick={()=>{likePost(item._id)}} >favorite_border</i>}
                                <h6>{item.likes?.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="Add Comment" />
                            </div>
                        </div>
                    )
                })
            }
            
            
        </div>
    )
}

export default Home
