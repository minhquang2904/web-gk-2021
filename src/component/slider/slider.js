import React from 'react';
import '../header/header.css'
import {Carousel} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import ReactPlayer from 'react-player';
import Runtimearrow from '../header/runtime_arrow';
import Actor from '../sliderarrow/actor'

const IMG_API = "https://image.tmdb.org/t/p/original";
const api_key ='?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US"'
const detailmoive = "https://api.themoviedb.org/3/movie/";
const noimg ='https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'

function hideClickSearch(e) {
    const hideSearch= document.querySelector(".js-search");
    hideSearch.classList.remove('active');
}

const html = document.querySelector('html')
html.addEventListener('click',hideClickSearch)

function onScroll(e){
    const header = document.querySelector('.nav-header')
    window.scrollY >= 200 ? header.classList.add('scrolly') : header.classList.remove('scrolly');
}


function limitedRead(title)
{
    if(title.length < 200)
    {
        return title;
    }
    return  title.substring(0,201);
}

document.addEventListener('scroll',onScroll)

function takeyear(string)
{
    if(string)
    {
        return string.split('-')[0]
    }
    return 'Undefined'
}


function Slider({movslider}){
    const [id, setid] = useState('');
    const [show, setshow] = useState(false);
    const [trailer, setrailer] = useState('');
    const [Detailtv,setDetailtv] = useState([])
    const [actor,setActor] = useState([])

    const idarr = [];
    movslider.slice(0,10).map((key) =>(
        idarr.push(key.id)
        )
    )
    
    function showModalarrow(e,id){
        const showModalMovie = document.querySelector('.modal-moive-pos-toptrending');
        const scrollTopmodal = document.querySelector('.modal-moive-infor-toptrending')
        showModalMovie.classList.add('active')
        scrollTopmodal.scrollTop = 0
        setid(id)
        setshow(true)
        e.stopPropagation();
    }

    function hideModalarrow(){
        const hideModal= document.querySelector('.modal-moive-pos-toptrending');
        hideModal.classList.remove('active') 
        setshow(false) 
    }
    
    function stopModalarrow(e){
        e.stopPropagation();
    }

    const GetTrailer = async () => {
        const url_trailer = detailmoive+id+'/videos'+api_key;
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

    const Getdetailtv = async () => {
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
            GetActor()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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
            Getdetailtv()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function getlang (arr)
    {
        for( var i = 0; i<arr.length;i++)
        {
            if(arr[i].english_name === 'ENGLISH' || arr[i].english_name === 'English' || arr[i].english_name === 'english')
            {
                return 'ENGLISH'
            }
        }
        return (arr[0].english_name ? arr[0].english_name :'Undefined')
    }
    return(
        <div className='content-slider'>
        <div className='slider'>
            <div className='slider-content'>
                <div>
                    <Carousel className='slider-show'>
                        {
                            movslider.slice(1,10).map((key,index) => {
                                return (
                                        <Carousel.Item className='slider-show-items'> 
                                            <img
                                            className="pic-slider"
                                            src= {IMG_API+key.backdrop_path}
                                            alt="First slide"
                                            />
                                            <div className='information-movie'>
                                                <div className='infor-slider-moive'>
                                                    <div className='infor-slider-moive-name'>
                                                        {key.title}
                                                    </div> 
                                                    <div className='infor-rate-year-episodes'>
                                                        <div   div className='infor-rate'>
                                                            <i class="fas fa-star"></i>
                                                            <h6>{key.vote_average}</h6>
                                                        </div>
                                                        <div className='infor-year'>
                                                            <h6>{takeyear(key.release_date)}</h6>
                                                        </div>
                                                        <div className='infor-phut'>
                                                            <Runtimearrow index ={index} idarr={idarr}></Runtimearrow>
                                                        </div>
                                                        <div className='infor-episodes'>
                                                            <h6>{key.original_language}</h6>
                                                        </div>
                                                    </div>    
                                                    <div className='infor-overview'>
                                                        <p>{limitedRead(key.overview)}<span className='see-add' onClick={(e)=> {showModalarrow(e,key.id)}}>...See more</span></p>
                                                    </div>
                                                    <div className='infor-slider-moive-intro'>
                                                        <div className='button-slider'>
                                                            <Link className='button-play-link' to = {'/watchmovie'} state = {{id: key.id,name: key.title}}>
                                                                <button className='button-play'>
                                                                    <i class="fas fa-play"></i>
                                                                        <p>Xem ngay</p>
                                                                </button>
                                                            </Link>

                                                            <button onClick={(e)=> {showModalarrow(e,key.id)}} className='button-infor'>
                                                                <i class="fas fa-info-circle"></i>
                                                                <p>Thông tin</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </Carousel.Item>
                                    );
                                }
                            )
                        }
                        </Carousel>
                        <div className='modal-moive-pos-toptrending' onClick={hideModalarrow}>
                            <div className='modal-moive-infor-toptrending' onClick={stopModalarrow}>
                                <div className='modal-header'>
                                    <img src={Detailtv.backdrop_path ===null? noimg : IMG_API+ Detailtv.backdrop_path} alt=''/>
                                    <i class="fas fa-times" onClick={hideModalarrow}></i>
                                </div>
                                <div className='modal-heading-name'>
                                        <span>
                                            {Detailtv.title}
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
                                                <span>{takeyear(Detailtv.release_date)}</span>
                                            </div>
                                            <div className='modal-coutry'>
                                                <span>{Detailtv.original_language}</span>
                                            </div>
                                            <div className='modal-season'>
                                                <span>{Detailtv.runtime} MIN</span>
                                            </div>
                                            <div className='modal-language'>
                                                <span>{Detailtv.spoken_languages && Detailtv.spoken_languages.length>0? getlang(Detailtv.spoken_languages) : 'Undefined'}</span>
                                            </div>
                                        </div>
                                        <div className='modal-type'>
                                            {(Detailtv.genres || Detailtv.genres !=null)? 
                                                Detailtv.genres.map(
                                                    (key,index) => {
                                                        return(
                                                            <span>{key.name} </span>
                                                        )
                                                    }
                                                )
                                            :'' 
                                            }
                                        </div>
                                        <div className='modal-overviews'>
                                            <p>{Detailtv.overview}</p>
                                        </div>
                                        <Link className='button-play-link' to = {'/watchmovie'} state = {{id: Detailtv.id,name: Detailtv.title}}>
                                            <button className='button-play'>
                                                <i class="fas fa-play"></i>
                                                    <p>Xem ngay</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className='modal-trailer'>
                                    <div className='heading-trailer'>
                                        Trailer
                                    </div>
                                    <div className='show-trailer'>
                                    {show ? <ReactPlayer url={'https://www.youtube.com/embed/'+trailer}  controls={true} className="modal-video"/>: <></>}
                                    </div>
                                </div>
                                    <Actor actor={actor} ></Actor>
                            </div>
                    </div>                              
                </div>
            </div>
        </div>
    </div>
    );
}

export default Slider