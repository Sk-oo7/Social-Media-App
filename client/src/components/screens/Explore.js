import React, { useEffect, useState, useContext } from 'react'
import "../../App.css"
import Post from '../Post';
import SearchUsers from '../SearchUsers';

function Explore() {
    const [data,setData] = useState([]);

    useEffect(()=>{
                    fetch("/allpost",{
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
            <SearchUsers />
            {
                data?.map(item=>
                    <Post item={item} key={item._id}/>
                )
            }
        </div>
    )
}

export default Explore
