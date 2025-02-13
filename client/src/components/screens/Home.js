import React, { useEffect, useState, useContext } from 'react'
import CreatePost from"./CreatePost"
import "../../App.css"
import Post from '../Post';

function Home() {

    const [data,setData] = useState([]);

    useEffect(()=>{
                    fetch("/getsubpost",{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    }
                }).then(res=> res.json())
                .then(result=>{
                    // console.log(result)
                    setData(result.posts)
                })
    },[])

    return (
        <div className="home">
            <CreatePost />
            {
                data?.map(item=>
                    <Post item={item} key={item._id}/>
                )
            }
        </div>
    )
}

export default Home
