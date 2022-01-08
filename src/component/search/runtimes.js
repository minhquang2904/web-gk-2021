import React from 'react';
import {useState} from 'react';

const detailmoive = "https://api.themoviedb.org/3/movie/";
const detailtv = "https://api.themoviedb.org/3/tv/";
const api_key ='?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US'

function Runtimes ({index,idarr,type}) {
    const [runtime,setruntime] = useState('')
    if(type === 'movie')
    {
    const url = detailmoive+idarr[index]+api_key;
        fetch(url).then((res)=>res.json())
        .then((data) =>{
            setruntime(data.runtime);
        });
    }
    else
    {
        const url =detailtv+idarr[index]+api_key;
        fetch(url).then((res)=>res.json())
        .then((data) =>{
            setruntime((Array.isArray(data.episode_run_time) && data.episode_run_time.length) ? data.episode_run_time[0]:'Undefined');
        });
    }               
return (
        <h6>{runtime} MIN</h6>
    );
}
export default Runtimes