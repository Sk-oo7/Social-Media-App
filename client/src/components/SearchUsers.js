import React, { useEffect, useState } from 'react'
import Avatar from "@material-ui/core/Avatar"

function SearchUsers() {
    const [search,setSearch] = useState("");
    const [result,setResult] = useState([]);

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
        <div style={{margin:"10px auto", maxWidth:"30%", minWidth:"200px", padding:"20px"}}>
            <input type='text' placeholder="Search users" value={search} onChange={(e)=>fetchUsers(e.target.value)} />
         
            {search && 
                <ul class="collection">
                    {result?.map(item=>
                        <li class="collection-item" style={{display:"flex"}}><Avatar src={item.pic} /> <h5>{item.name}</h5></li>
                    )}
                </ul>
            }
         
                
        </div>
    )
}

export default SearchUsers
