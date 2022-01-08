import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import './watchmovie.css';

function WatchMovie(){
    const {state}  = useLocation();
    const [e,sete] = useState('1');
    
    function clickes(e,index)
    {
        sete(index)
        e.stopPropagation();
    }

    function scrollToTopmovie(){
        document.body.scrollTop = 100;
        document.documentElement.scrollTop = 100;
    };

    scrollToTopmovie()
    return(
        <div className="watch-movie">
            <div className="watch-movie-cover">
                <div className="watch-movie-play">
                    {state.index ==null ?
                    <iframe className="custom-video-watch-movie" src={'https://www.2embed.ru/embed/tmdb/movie?id='+state.id} frameBorder="0" allowFullScreen title="Movie" aria-hidden="true"/>:
                    <iframe className="custom-video-watch-movie" src={'https://www.2embed.ru/embed/tmdb/tv?id='+state.id+'&s='+state.index+'&e='+e} frameBorder="0" allowFullScreen title="TV" aria-hidden="true"/>
                    } 
                </div>
                <div className="watch-movie-title-es">
                    <div className="watch-movie-title">
                        <span>{state.name}</span>
                    </div>
                { state.index ==null ? 
                    <></>:
                <>
                    <div className="watch-movie-season-es">
                        <span>{state.ss} - </span>
                        <span>Episodes {e}</span>
                    </div>
                    <div className="watch-movie-es-list">
                        {
                            Array.from(Array(state.es), (key, index) => {
                                    if(e === '1')
                                {
                                        return(
                                            <div index = {index} onClick={(e)=> {clickes(e,index+1)}}  className= {index+1 === 1 ? "list-item-es active" : "list-item-es"}>{index+1}</div>
                                        )
                                }
                                else
                                {
                                        return(
                                            <div index = {index} onClick={(e)=> {clickes(e,index+1)}} className= {e === index+1 ? "list-item-es active" : "list-item-es"}>{index+1}</div>
                                        )
                                }  
                            }
                            )
                        }
                    </div>
                </>
                }
                </div>
            </div>
        </div>
    )
}

export default WatchMovie;