import React, { useEffect, useState, useContext } from 'react'
import CreatePost from"./CreatePost"
import {UserContext} from "../../App"
import "../../App.css"

function Home() {

    const [data,setData] = useState([]);
    const{state} = useContext(UserContext)
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

    useEffect(() => {
        let value = localStorage.getItem("sidebar-scroll");
        setTimeout(() => {
            if (value !== null) {
                window.scrollTo(0,value);
            }
          }, 100);
    })

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
        
            localStorage.setItem("sidebar-scroll", window.scrollY);
          
        window.location.reload(false);
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
        localStorage.setItem("sidebar-scroll", window.scrollY);
        window.location.reload(false);
    }
    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
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
                data?.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img alt="" src={item.photo} />
                            </div>
                            <div className="card-content">
                                {item.likes.some(likes=>likes.postedBy == state._id)?
                                <i className="btn-flat btn-small btn-floating center material-icons N/A transparent" style={{color:"red"}} onClick={()=>{unlikePost(item._id)}} >favorite</i> : 
                                <i className="btn-flat btn-small btn-floating center material-icons N/A transparent" style={{color:"red"}} onClick={()=>{likePost(item._id)}} >favorite_border</i>}
                                <span style={{fontSize:"22px"}}>{item.likes?.length} likes</span>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return <h6 key={record._id}> 
                                            <b>{record.postedBy.name} </b>
                                            <span>{record.text}</span>
                                        </h6>
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                    <input className="input-field" type="text" placeholder="Add Comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
            
            
        </div>
    )
}

export default Home
