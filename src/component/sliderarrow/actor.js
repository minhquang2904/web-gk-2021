import Slider from "react-slick";
import React, { Component } from 'react';
import './slarrow.css';


const IMG_API = "https://image.tmdb.org/t/p/w500/";
const noimg ='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

function ShowSampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
        className={className}
        style={{ 
            margin: "-27px 10px 0 0",
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
            margin: "-27px 0 0 0",
        }}
        onClick={onClick}
        />
    );
}

export default class Responsive extends Component {

render() {


var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
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
            <div className = "seasson-title">Actor list</div>
        </h2>
        <Slider {...settings} className="sl-arrow-multi">
            {
                this.props.actor.map((key)=> 
                    {
                        return(
                        <div className="actor-dir">
                            <img className="pic-actor" src={key.profile_path == null ? noimg : IMG_API + key.profile_path} alt=""/>
                            <div className="infor-actor">
                                <span>{key.original_name}</span>
                            </div>
                        </div>
                        )
                    })}
        </Slider>
    </div>
);
}
}