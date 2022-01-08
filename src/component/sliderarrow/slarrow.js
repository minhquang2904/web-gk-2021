import Slider from "react-slick";
import React, { Component } from 'react';
import './slarrow.css';
import {Link} from 'react-router-dom'

const IMG_API = "https://image.tmdb.org/t/p/w500/";
const noimg ='https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'

function ShowSampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
        className={className}
        style={{ 
            margin: "-25px 10px 0 0",
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
            margin: "-25px 0 0 0",
        }}
        onClick={onClick}
        />
    );
}

function takeyear(string)
{
    if(string)
    {
        const date = string.split("-").reverse().join("-");
        return date
    }
    return 'Undefined'
}


export default class Responsive extends Component {

render() {


var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    className:"center",
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
};
return (
    <div className="container-sl">
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <h2 className="heading-container-sl">
            <div className = "seasson-title">Seasson list</div>
        </h2>
        <Slider {...settings} className="sl-arrow-multi">
            {Object.values(this.props.imgss).map((key,idx)=>{  
                        if(this.props.imgss.length > 0)
                        {
                            if(this.props.imgss[idx].name === ("Season " + this.props.imgss[idx].season_number))
                            {
                                return(
                                    <Link className='custom-video-slarrow' to = {'/watchmovie'}
                                         state = {{id: this.props.id,
                                                index: this.props.imgss[idx].season_number,
                                                name: this.props.name,
                                                ss: this.props.imgss[idx].name,
                                                es: this.props.imgss[idx].episode_count
                                            }}
                                    >
                                        <div key ={idx}>
                                            <div>
                                                <img src= { key.poster_path ==null? noimg : IMG_API+ key.poster_path} alt=""/>
                                                <div className="sl-arrow-infor"> 
                                                    <div className="infor-episode-time">
                                                        <span>Season {key.season_number} - </span>
                                                        <span>{key.episode_count} Episodes</span>
                                                    </div>
                                                    <div className="infor-country-year">
                                                        <span>{takeyear(key.air_date)}</span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            else
                            {
                                return(
                                    <Link className='custom-video-slarrow' to = {'/watchmovie'}
                                         state = {{id: this.props.id,
                                                    index: this.props.imgss[idx].season_number,
                                                    name: this.props.name,
                                                    ss: this.props.imgss[idx].name,
                                                    es: this.props.imgss[idx].episode_count
                                                }}
                                    >
                                        <div key ={idx}>
                                            <div>
                                                <img src= { key.poster_path ==null? noimg : IMG_API+ key.poster_path} alt=""/>
                                                <div className="sl-arrow-infor"> 
                                                    <div className="infor-episode-time">
                                                        <span>Season {key.name} - </span>
                                                        <span>{key.episode_count} Episodes</span>
                                                    </div>
                                                    <div className="infor-country-year">
                                                        <span>{key.air_date}</span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     </Link>
                                )
                            }
                        }
                        else
                        {
                            return <span className = "seasson-list">{key.name}</span>
                        }
                    }
                )
            }
        </Slider>
    </div>
);
}
}