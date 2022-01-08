import Slider from "react-slick";
import React from 'react';
import './sliderarrow.css'
import {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import Actor from '../sliderarrow/actor';
import {Link} from 'react-router-dom'
/* api_img */
const IMG_API = "https://image.tmdb.org/t/p/original";
/* api_img */
const apitrailer = '/videos';
const api_key ='?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US"'
const detailmoive = "https://api.themoviedb.org/3/movie/";
const noimg ='https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'


function Sliderarrow ({movs}){

    const [trailer, setrailer] = useState('');
    const [show, setshow] = useState(false);
    const [idx, setid] = useState('');
    const [Detailtmovie,setDetailMovie] = useState([])
    const [actor,setActor] = useState([])

    function showModal(e,idex){
        const showModalMovie = document.querySelector('.modal-moive-pos-toptrending-arrow');
        const scrollTopmodal = document.querySelector('.modal-moive-infor-toptrending-arrow')
        showModalMovie.classList.add('active')
        scrollTopmodal.scrollTop = 0
        setshow(true)
        setid(idex)
        e.stopPropagation();
    }

    function hideModal(){
        const hideModal= document.querySelector('.modal-moive-pos-toptrending-arrow');
        hideModal.classList.remove('active')  
        setshow(false)
    }
    function stopModal(e){
        e.stopPropagation();
    }

    const Getidimg = async () => {
        const url = detailmoive+idx+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setDetailMovie(data)
    }

    const GetTrailer = async () => {
        const url_trailer = detailmoive+idx+apitrailer+api_key;
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

     const GetActor = async () => {
        const url = detailmoive+idx+'/credits'+api_key;
        let response = await fetch(url)
        let data  = await response.json() 
        setActor(data.cast)
    }
    
    function takeyear(string)
    {
        if(string)
        {
            return string.split('-').reverse().join('-')
        }
        return 'Undefined'
    }
    
    useEffect(() => {
        if(idx)
        {
            GetTrailer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx,show])

    useEffect(() => {
        if(idx)
        {
            Getidimg()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx])

    useEffect(() => {
        if(idx)
        {
            GetActor()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx])

    function ShowSampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div
            className={className}
            style={{ 
                display: "flex", 
                justifyContent:"center",
                alignItems: "center",
                margin: "0 18px 0 0px",
                background: "red",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                opacity: "0.8",
            }}
            onClick={onClick}
            />
        );
    }


    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div
            className={className}
            style={{  
                display: "flex", 
                justifyContent:"center",
                alignItems: "center",
                margin: "0 0px 0 5px",
                background: "red",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                opacity: "0.8",
                zIndex: "1",
                
            }}
            onClick={onClick}
            />
        );
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 9,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        },
        ],
        nextArrow: <ShowSampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }

    return (
        <div className="container-slider">
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            <h2 className="heading-container-slider"> Top trending </h2>
            <div className="line-sp-container-slider"></div>
            <Slider {...settings} className="slider-arrow-multi">
                {movs.map(list => {
                    return( 
                        movs.length ?    
                                <div className="movie-hot-slider-arrow" onClick={(e)=> {showModal(e,list.id)}}>
                                    <div className="content-slider-arrow-multi">
                                        <h4 className="heading-name-slider">
                                                {list.title}
                                        </h4>
                                        <div className="heading-time-year">
                                            <p>{takeyear(list.release_date)}</p>
                                            <p>
                                                {Detailtmovie.runtime} MIN
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <i  class="far fa-play-circle icon-play-slider"></i>
                                    </div>
                                    <img src={IMG_API + list.poster_path} alt=""/>
                                    <div className="heading-score-moive">
                                        <div className="score-arrow">{list.vote_average}</div>
                                    </div>
                                    <div className="heading-score-aver">
                                        <div className="aver-arrow">
                                            <i class="far fa-eye heading-time-year-icon-see"></i>
                                            <div>{list.vote_count}</div>              
                                        </div>
                                    </div>
                                </div>
                    :<></>)
                })
            }
            </Slider>
            <div className='modal-moive-pos-toptrending-arrow' onClick={hideModal}>
                <div className='modal-moive-infor-toptrending-arrow' onClick={stopModal}>
                    <div className='modal-header'>
                        <img src={Detailtmovie.backdrop_path ==null? noimg : IMG_API+ Detailtmovie.backdrop_path} alt=""/>
                        <i class="fas fa-times" onClick={hideModal}></i>
                    </div>
                    <div className='modal-heading-name'>
                            <span>
                                {Detailtmovie.original_title}
                            </span>
                    </div>
                    <div className='modal-infor'>
                        <div className='modal-overview'>
                            <div className='modal-score-count'>
                                <div className='modal-see'>
                                    <i class="far fa-eye heading-time-year-icon-see"></i>
                                    <span>{Detailtmovie.vote_count}</span>
                                </div>
                                <div className='modal-score'>
                                    <i class="fas fa-star"></i>
                                    <span>{Detailtmovie.vote_average}</span>
                                </div>
                            </div>
                            <div className='modal-year'>
                                <div className='modal-date'>
                                    <span>{takeyear(Detailtmovie.release_date)}</span>
                                </div>
                                <div className='modal-runtime'>
                                    <span>{Detailtmovie.runtime} MIN</span>
                                </div>
                                <div className='modal-language'>
                                    <span>{Detailtmovie.original_language}</span>
                                </div>
                            </div>
                            <div className='modal-type'>
                            {
                                (Detailtmovie.genres || Detailtmovie.genres !=null)? 
                                Detailtmovie.genres.map(
                                    (key,index) => {
                                        return(
                                            <span>{key.name} </span>
                                        )
                                    }
                                )
                            :'' }
                            </div>
                            <div className='modal-overviews'>
                                <p>{Detailtmovie.overview}</p>
                            </div>
                            <Link className='button-play-link' to = {'/watchmovie'} state = {{id: Detailtmovie.id,name: Detailtmovie.original_title}}>
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
    )
}

export default Sliderarrow