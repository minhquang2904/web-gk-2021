import React from "react";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './search.css';
import {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import Runtimes from "./runtimes";
import Actor from '../sliderarrow/actor';
import Slarrow from '../sliderarrow/slarrow'

const IMG_API = "https://image.tmdb.org/t/p/w500";
const IMG_API_ORI = "https://image.tmdb.org/t/p/original"
const api_key ='?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US'
const detailmoive = "https://api.themoviedb.org/3/movie/";
const detailtv = "https://api.themoviedb.org/3/tv/";
const apitrailer = '/videos';
const noimg ='https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'
const Search_apitv = 'https://api.themoviedb.org/3/search/tv?api_key=7594db077d94ef4619043ef966d3e26d&query=';
const Search_api = 'https://api.themoviedb.org/3/search/movie?api_key=7594db077d94ef4619043ef966d3e26d&query=';

function Search (){
    const {state}  = useLocation();
    const [id, setid] = useState('');
    const [title, settitle] = useState('');
    const [view, setview] = useState('');
    const [overview, setoverview] = useState('');
    const [poitn, setpoitn] = useState('')
    const [date, setdate] = useState('')
    const [show, setshow] = useState(false);
    const [trailer, setrailer] = useState('');
    const [img, setimg] = useState('');
    const [country,setcountry] = useState([])
    const [Detailtv,setDetailtv] = useState([])
    const [actor,setActor] = useState([])
    const [type,settype] = useState('movie')
    const [data,setdata] = useState([])
    const [tempsearch,settempsearch] = useState('')
    const [ss,setss] = useState('');
    const [imgss,setimgss] = useState([])
    
    if(tempsearch !== state.searchkey)
    {
        settempsearch(state.searchkey)
    }

    function getdata ()
    {
        if(type === 'tv')
        {
            fetch(Search_apitv+tempsearch).then((res)=>res.json())
            .then((data) =>{
                setdata(data.results)
            });
        }
        else
        {
            fetch(Search_api+tempsearch).then((res)=>res.json())
            .then((data) =>{
                setdata(data.results)
            });
        }
    }

    const idarr = [];
        data.map((key) =>(
            idarr.push(key.id)
        )
    )
    
    function showModalarrowtop(e,id,img,title,view,poitn,overview,date,count){
        const showModalMovie = document.querySelector('.modal-moive-pos-toptrending-arrow');
        const scrollTopmodal = document.querySelector('.modal-moive-infor-toptrending-arrow')
        showModalMovie.classList.add('active')
        scrollTopmodal.scrollTop = 0
        setid(id)
        setshow(true)
        setimg(img)
        settitle(title)
        setview(view)
        setpoitn(poitn)
        setoverview(overview)
        setdate(date)
        setcountry(count)
        e.stopPropagation();
    }
    function hideModalarrowtop(){
        const hideModal= document.querySelector('.modal-moive-pos-toptrending-arrow');
        hideModal.classList.remove('active') 
        setshow(false) 
    }
    function stopModalarrowtop(e){
        e.stopPropagation();
    }
    const GetTrailer = async () => {
        const url_trailer = (type === 'movie' ? detailmoive+id+apitrailer+api_key:detailtv+id+apitrailer+api_key)
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

    const Getdetail = async () => {
        const url = (type === 'movie'?detailmoive+id+api_key:detailtv+id+api_key)
        let response = await fetch(url)
        let data  = await response.json() 
        setDetailtv(data)
    }

    const GetActor = async () => {
        const url =  (type === 'movie'?detailmoive+id+'/credits'+api_key:detailtv+id+'/credits'+api_key)
        let response = await fetch(url)
        let data  = await response.json() 
        setActor(data.cast)
    }

    const Getss = async () => {
        const url = detailtv+id+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setss(data.last_episode_to_air ?data.last_episode_to_air.season_number:'undefined')
    }

    const Getimgss = async () => {
        const url = detailtv+id+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setimgss(data.seasons)
    }

    useEffect(() => {
        if(type === 'tv')
        {
            Getss()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if(type === 'tv')
        {
            Getimgss()
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
            Getdetail()
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

    useEffect(() => {
        getdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type,state.searchkey])

    function takeyear(string)
    {
        if(string)
        {

            return string.split('-')[0]
        }
        return 'Undefined'
    }
    function takeyeardetail(string)
    {
        if(string)
        {
            const date = string.split('-')
            return date[2] + '-' + date[1] + '-' + date[0]
        }
        return 'Undefined'
    }
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

    function showChooseType(){
        const showChoose = document.querySelector('.choose-type-items')
        const iconArrow = document.querySelector('.active-arrow')
        iconArrow.classList.toggle('active')
        showChoose.classList.toggle('active')
    }

    function stopChooseType(e){
        e.stopPropagation()
    }

    function clickHide() {  
        const app = document.querySelector('.search-bg')
        app.addEventListener('click',() =>{
            const hideChoose = document.querySelector('.choose-type-items')
            const hideIconArrow = document.querySelector('.active-arrow')
            hideChoose.classList.remove('active');
            hideIconArrow.classList.remove('active');
        })    
    }

    function scrollToTopSearch(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
return(
    <div className="search-bg" onClick={clickHide} onLoad={scrollToTopSearch}>
        <div className="result-search">
            <span>Search Results</span>
            <span className="choose-type">
                <span className="choose-type-heading" onClick={showChooseType}>
                    <span>{type === 'movie'?'Series movie':'Feature film'}</span>
                    <i class="fas fa-chevron-down active-arrow"></i>
                    <div className="choose-type-items" onClick={stopChooseType}>
                        <div onClick={()=>{
                            settype('movie')
                        }} >Series movie</div>
                        <div onClick={()=>{
                             settype('tv')
                        }}>Feature film</div>
                    </div>
                </span>
            </span>
        </div>
        <div className="line-sp-container-search"></div>
        <div  className="search-section">
            {data.length > 0 && data.map((list,index)=>
                <div className="search-items">
                    <div className="seach-custom" onClick={(e)=> {showModalarrowtop(e,list.id,list.backdrop_path,(type === 'movie'?list.title:list.name),list.vote_count,list.vote_average,list.overview,list.release_date,list.original_language)}}>
                        <img src={list.poster_path ? IMG_API+list.poster_path : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'} alt="">
                        </img> 
                        <div className="seach-avr">
                            <div>
                                {list.vote_average}
                            </div>
                            <div className="search-avrtr">
                                    
                            </div>
                        </div>
                        <div className="icon-play-search">
                            <i  class="far fa-play-circle"></i>
                        </div>
                        <div className="search-moive-infor">
                            <div className="search-heading-name">
                                <span>{type === 'movie' ? list.title:list.name}</span>
                            </div>
                            <div className="search-date-time">
                                <span>{takeyear(type === 'movie'?list.release_date:list.first_air_date)}</span>
                                <Runtimes index={index} idarr={idarr} type ={type}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className='modal-moive-pos-toptrending-arrow' onClick={hideModalarrowtop}>
            <div className='modal-moive-infor-toptrending-arrow' onClick={stopModalarrowtop}>
                    <div className='modal-header'>
                        <img src={img ===null? noimg : IMG_API_ORI+ img} alt=""/>
                        <i class="fas fa-times" onClick={hideModalarrowtop}></i>
                    </div>
                    <div className='modal-heading-name'>
                            <span>
                                {title}
                            </span>
                    </div>
                    <div className='modal-infor'>
                        <div className='modal-overview'>
                            <div className='modal-score-count'>
                                <div className='modal-see'>
                                    <i class="far fa-eye heading-time-year-icon-see"></i>
                                    <span>{view}</span>
                                </div>
                                <div className='modal-score'>
                                    <i class="fas fa-star"></i>
                                    <span>{poitn}</span>
                                </div>
                            </div>
                            <div className='modal-year'>
                                <div className='modal-date'>
                                    <span>{(type === 'movie'?takeyeardetail((date)):'Last Season in '+takeyear(Detailtv.last_air_date))}</span>
                                </div>
                                <div className='modal-coutry'>
                                    <span>{country}</span>
                                </div>
                                <div className='modal-season'>
                                    <span>{type === 'movie'?Detailtv.runtime+' MIN':ss+' Season'}</span>
                                </div>
                                <div className='modal-language'>
                                    <span>{Detailtv.spoken_languages && Detailtv.spoken_languages.length>0? getlang(Detailtv.spoken_languages) : 'Undefined'}</span>
                                </div>
                            </div>
                            <div className='modal-type'>
                                {
                                (Detailtv.genres || Detailtv.genres != null)? 
                                Detailtv.genres.map(
                                    (key) => {
                                        return(
                                            <span>{key.name} </span>
                                        )
                                    }
                                )
                            :'' }
                            </div>
                            <div className='modal-overviews'>
                                <p>{overview}</p>
                            </div>
                            {
                            type === 'movie'?
                            <Link className='button-play-link'  to = {'/watchmovie'} state = {{id: Detailtv.id, name: Detailtv.title}}>
                                <button className='button-play'>
                                    <i class="fas fa-play"></i>
                                        <p>Xem ngay</p>
                                </button>
                            </Link>

                            :<></>}
                        </div>
                    </div>
                    {type === 'tv'?<Slarrow id={id} imgss ={imgss} name={Detailtv.name}/>:<></>}
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
    );
}
export default Search;