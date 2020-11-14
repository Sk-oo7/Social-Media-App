import React, { useContext, useEffect, useState } from 'react'
import Avatar from "@material-ui/core/Avatar"
import {UserContext} from "../App"
import { Link } from 'react-router-dom';

function SearchUsers() {
    const [search,setSearch] = useState("");
    const [result,setResult] = useState([]);
    const{state} = useContext(UserContext)

    const fetchUsers = (query)=>{
        setSearch(query)
        fetch("/search-users",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(results=>
            setResult(results.user)
        )
    }

    return (
        <div style={{margin:"10px auto", maxWidth:"30%", minWidth:"200px"}}>
            <input type='text' placeholder="Search users" value={search} onChange={(e)=>fetchUsers(e.target.value)} />
         
            {search && 
                <ul className="collection">
                    {result?.map(item=>
                        item._id !== state._id? <Link to={"/profile/"+item._id}><li key={item._id} className="collection-item" style={{display:"flex",paddingLeft:"10px"}}>
                            <Avatar src={item.pic} /> <div style={{display:"flex",flexDirection:"column"}}><h6 style={{marginLeft:"5px",marginTop:"8px",fontSize:"20px"}}>{item.name}</h6><small style={{color:"gray",marginTop:"-10px"}}>({item.email})</small></div>
                        </li></Link>:
                        <Link to="/profile"><li key={item._id} className="collection-item" style={{display:"flex",paddingLeft:"10px"}}>
                        <Avatar src={item.pic} /> <div style={{display:"flex",flexDirection:"column"}}><h6 style={{marginLeft:"5px",marginTop:"8px",fontSize:"20px"}}>{item.name}</h6><small style={{color:"gray",marginTop:"-10px"}}>({item.email})</small></div>
                    </li></Link>
                    )}
                </ul>
            }
         
                
        </div>
    )
}

export default SearchUsers
