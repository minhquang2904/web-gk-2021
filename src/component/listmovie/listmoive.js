import React from 'react';
import './listmovie.css';
import {useEffect, useState} from 'react';
import Slarrow from '../sliderarrow/slarrow'
import ReactPlayer from 'react-player';
import Runtime from './runtime_component';
import Actor from '../sliderarrow/actor';

const IMG_API = "https://image.tmdb.org/t/p/w500";
const IMG_API_ORI = "https://image.tmdb.org/t/p/original"
const api_key ='?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US'
const detailmoive = "https://api.themoviedb.org/3/tv/";
const apitrailer = '/videos';
const noimg ='https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'

function ListMoive  ({movseason}) {
    const [trailer, setrailer] = useState('');
    const [id, setid] = useState('');
    const [show, setshow] = useState(false);
    const [ss,setss] = useState('');
    const [imgss,setimgss] = useState([])
    const [Detailtv,setDetailtv] = useState([])
    const [actor,setActor] = useState([])

    const idarr = [];
    movseason.slice(0,18).map((key) =>(
        idarr.push(key.id)
        )
    )

    function showModal(e,id){
        const showModalMovie = document.querySelector('.modal-moive-pos');
        const scrollTopmodal = document.querySelector('.modal-moive-infor')
        showModalMovie.classList.add('active')
        scrollTopmodal.scrollTop = 0
        setid(id)
        setshow(true)
        e.stopPropagation();
    }

    function hideModal(){
        const hideModal= document.querySelector('.modal-moive-pos');
        hideModal.classList.remove('active')  
        setshow(false)
    }
    function stopModal(e){
        e.stopPropagation();
    }

    const GetTrailer = async () => {
        const url_trailer = detailmoive+id+apitrailer+api_key;
        let response = await fetch(url_trailer)
        let data  = await response.json() 
        if (Array.isArray(data.results) && data.results.length)
            {
                setrailer(data.results.at(-1).key)
                setshow(true)
            }
            else
            {
                setrailer("iik25wqIuFo");
                setshow(true)
            }
    }

    const Getss = async () => {
        const url = detailmoive+id+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setss(data.last_episode_to_air ?data.last_episode_to_air.season_number:'undefined')
    }

    const Getimgss = async () => {
        const url = detailmoive+id+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setimgss(data.seasons)
    }

    const Getidimg = async () => {
        const url = detailmoive+id+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setDetailtv(data)
    }

    const GetActor = async () => {
        const url = detailmoive+id+'/credits'+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setActor(data.cast)
    }

    useEffect(() => {
        if(id)
        {
            GetTrailer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,show])

    useEffect(() => {
        if(id)
        {
            Getss()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if(id)
        {
            Getimgss()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,ss])

    useEffect(() => {
        if(id)
        {
            Getidimg()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if(id)
        {
            GetActor()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function takeyear(string)
    {
        if(string)
        {

            return string.split('-')[0]
        }
        return 'Undefined'
    }

return (
    <>
        <div className='list-moive-all'>
            <h3 className='heading-moive-all-le'>
                Danh sách - Phim bộ
            </h3>
            <div className="line-sp-container-slider"></div>
            <div className='moive-all-le'>
                <div className='movie-le'>
                    {
                        movseason.slice(0,18).map((key,index) => {
                            return (
                                    <>
                                        <div className='le-all' onClick={(e)=> {showModal(e,key.id)}}>
                                            <div className="content-slider-arrow-multi-le">
                                                <h4 className="heading-name-slider-le">
                                                    {key.name}
                                                </h4>
                                                <div className="heading-time-year-le">
                                                    <p>{takeyear(key.first_air_date)}</p>
                                                    <Runtime index ={index} idarr = {idarr}></Runtime>
                                                </div>
                                            </div>
                                            <div>
                                                <i  class="far fa-play-circle icon-play-slider-le"></i>
                                            </div>
                                            <img src={IMG_API + key.poster_path} alt='IMG'/>
                                            <div className="content-score-moive">
                                                <div className="score-moive-le">{key.vote_average}</div>
                                            </div>
                                            <div className="heading-score-aver-le">
                                                <div className="aver-arrow-le">
                                                    <i class="far fa-eye heading-time-year-icon-see"></i>
                                                    <div>{key.vote_count}</div>              
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                        )
                    }
                </div>
            </div>
        </div>
        <div className='modal-moive-pos' onClick={hideModal}>
            <div className='modal-moive-infor' onClick={stopModal}>
                <div className='modal-header'>
                    <img src={ Detailtv.backdrop_path == null? noimg : IMG_API_ORI+ Detailtv.backdrop_path} alt='IMG'/>
                    <i class="fas fa-times" onClick={hideModal}></i>
                </div>
                <div className='modal-heading-name'>
                        <span>
                            {Detailtv.name}
                        </span>
                </div>
                <div className='modal-infor'>
                    <div className='modal-overview'>
                        <div className='modal-score-count'>
                            <div className='modal-see'>
                                <i class="far fa-eye heading-time-year-icon-see"></i>
                                <span>{Detailtv.vote_count}</span>
                            </div>
                            <div className='modal-score'>
                                <i class="fas fa-star"></i>
                                <span>{Detailtv.vote_average}</span>
                            </div>
                        </div>
                        <div className='modal-year'>
                            <div className='modal-date'>
                                <span>Last Season in {takeyear(Detailtv.last_air_date)}</span>
                            </div>
                            <div className='modal-coutry'>
                                <span>{Detailtv.origin_country}</span>
                            </div>
                            <div className='modal-season'>
                                <span>{ss} Season</span>
                            </div>
                            <div className='modal-language'>
                                <span>{Detailtv.languages}</span>
                            </div>
                        </div>
                        <div className='modal-type'>
                            {
                                (Detailtv.genres || Detailtv.genres !=null)? 
                                Detailtv.genres.map(
                                    (key,index) => {
                                        return(
                                            <span>{key.name} </span>
                                        )
                                    }
                                )
                            :'' }
                        </div>
                        <div className='modal-overview'>
                            <p>{Detailtv.overview}</p>
                        </div>
                    </div>
                </div>
                <Slarrow id={id} imgss ={imgss} name={Detailtv.name}/>
                <div className='modal-trailer'>
                    <div className='heading-trailer'>
                        Trailer
                    </div>
                    <div className='show-trailer'>
                        {show ? <ReactPlayer url={'https://www.youtube.com/embed/'+trailer}  controls={true} className="modal-video"/>: <></>}
                    </div>
                </div>
                <Actor actor = {actor}/>
            </div>
        </div>
    </>
    
);
}


export default ListMoive








