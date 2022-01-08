import React from 'react';
import {useEffect, useState} from 'react';

const detailmoive = "https://api.themoviedb.org/3/movie/";
const api_key ='?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US'

function Runtimearrow ({index,idarr}) {
    const [runtime,setruntime] = useState('')
    const url = detailmoive+idarr[index]+api_key;
    useEffect(()=>{
        fetch(url).then((res)=>res.json())
        .then((data) =>{
            setruntime(data.runtime);
        });    
    },[url]);
                
return (
        <h6>{runtime} MIN</h6>
    );
}
export default Runtimearrow