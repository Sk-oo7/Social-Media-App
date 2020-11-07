import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from "../App"
import { WaveLoading  } from 'react-loadingg';
import M from "materialize-css"
import { Link } from 'react-router-dom';

function Post(item) {

    const [lcount,setLcount]=useState(item.item.likes?.length);
    const [showload,setShowload]=useState(true);
    const{state} = useContext(UserContext)
    const [show,setShow]=useState(item.item.likes.some(likes=>likes.postedBy == state._id))


    const [data,setData] = useState([]);
    const [cmt,setCmt] = useState([]);
    useEffect(()=>{
        setTimeout(()=>{
            setShowload(false)
        },1000)
        fetch("/allpost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    useEffect(()=>{
            let elems = document.querySelectorAll(".collapsible");
            M.Collapsible.init(elems);
    })

    const likePost = (id)=>{
        setLcount(lcount+1)
        setShow(!show)
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
        setLcount(lcount-1)
        setShow(!show)
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
        cmt.push(text); 
  }

    if(showload)
        return <WaveLoading color="#1e88e5" speed={1} />
    else return (
        <div className="card home-card" key={item.item._id}>
            
                            
                            {item.item.postedBy._id === state._id ? <Link to={"/profile"}><h5>{item.item.postedBy.name}</h5></Link> : <Link to={"/profile/"+item.item.postedBy._id}><h5>{item.item.postedBy.name}</h5></Link>}
                            <div className="card-image">
                                <img alt="" src={item.item.photo} />
                            </div>
                            <div className="card-content">
                                
                                {show?  <i className="btn-flat btn-small btn-floating center material-icons N/A transparent" style={{color:"red"}} onClick={()=>{unlikePost(item.item._id)}} >favorite</i> :
                                <i className="btn-flat btn-small btn-floating center material-icons N/A transparent" style={{color:"red"}} onClick={()=>{likePost(item.item._id)}} >favorite_border</i>}
                                <span style={{fontSize:"22px"}}>{lcount} likes</span>
                                <h6>{item.item.title}</h6>
                                <p>{item.item.body}</p>
                                <ul className="collapsible">
                                <li>
                                <div className="collapsible-header"><i className="material-icons">comment</i>Comments</div>
                                <div className="collapsible-body"><span>  
                                {
                                    item.item.comments.map(record=>{
                                        return <h6 key={record._id}> 
                                            <b>{record.postedBy.name} </b>
                                            <span>{record.text}</span>
                                        </h6>
                                    })
                                }{
                                    cmt.map(txt=>
                                        <h6> 
                                            <b>{state.name} </b>
                                            <span>{txt}</span>
                                        </h6>
                                    )
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item.item._id)
                                    e.target.reset()
                                }}>
                                    <input className="input-field" type="text" placeholder="Add Comment" />
                                </form></span></div>
                                </li>
                                </ul>
                               
                            </div>
                        </div>
    )
}

export default Post
