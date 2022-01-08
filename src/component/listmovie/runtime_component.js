import React from 'react';
import './listmovie.css';
import {useEffect, useState} from 'react';

const detailmoive = "https://api.themoviedb.org/3/tv/";
const api_key ='?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US'

function Runtime ({index,idarr}) {
    const [runtime,setruntime] = useState('')
    
    const url = detailmoive+idarr[index]+api_key;
    useEffect(()=>{
        fetch(url).then((res)=>res.json())
        .then((data) =>{
            setruntime((Array.isArray(data.episode_run_time) && data.episode_run_time.length) ? data.episode_run_time[0]:'');
        });    
    },[url]);
                
return (
        <p>{runtime} MIN</p>
    );
}
export default Runtime