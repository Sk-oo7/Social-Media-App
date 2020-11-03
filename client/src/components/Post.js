import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from "../App"
import { WaveLoading  } from 'react-loadingg';
import M from "materialize-css"

function Post(item) {

    const [lcount,setLcount]=useState(item.item.likes?.length);
    const [showload,setShowload]=useState(false);
    const{state} = useContext(UserContext)
    const [show,setShow]=useState(item.item.likes.some(likes=>likes.postedBy == state._id))
    const [cls,setCls]=useState("");

    const [data,setData] = useState([]);
    useEffect(()=>{
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

     useEffect(() => {
        let value = localStorage.getItem("sidebar-scroll");
        let itm = localStorage.getItem("item");
        
        setShowload(true)
        setTimeout(() => {
            setShowload(false)
            if (value !== null) {
                window.scrollTo(0,value);
                localStorage.setItem("sidebar-scroll", null);
                localStorage.setItem("item", null);
                if(item.item._id == itm){
                    setCls("active")
                }
            }
          }, 500); 
          setCls("")
    },[])

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
        localStorage.setItem("sidebar-scroll", window.scrollY);
        localStorage.setItem("item",item.item._id);
        window.location.reload(false);
  }

    if(showload)
        return <WaveLoading color="#1e88e5" speed={1} />
    else return (
        <div className="card home-card" key={item.item._id}>
            
                            <h5>{item.item.postedBy.name}</h5>
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
                                <li className={cls}>
                                <div className="collapsible-header"><i className="material-icons">comment</i>Comments</div>
                                <div className="collapsible-body"><span>  
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item.item._id)
                                }}>
                                    <input className="input-field" type="text" placeholder="Add Comment" />
                                </form>{
                                    item.item.comments.map(record=>{
                                        return <h6 key={record._id}> 
                                            <b>{record.postedBy.name} </b>
                                            <span>{record.text}</span>
                                        </h6>
                                    })
                                }</span></div>
                                </li>
                                </ul>
                               
                            </div>
                        </div>
    )
}

export default Post
