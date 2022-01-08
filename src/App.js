import React , { useEffect, useState } from 'react';
import './App.css';
import Header from './component/header/header';
import Sliderarrow from './component/slidermulti/sliderarrow';
import Listmoive from './component/listmovie/listmoive';
import Footer from './component/footer/footer';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Search from './component/search/search';
import Slider from './component/slider/slider';
import WatchMovie from './component/watchmovie/watchmovie';

// some_api_key 
const api_key = 'api_key=7594db077d94ef4619043ef966d3e26d';
const base_url = 'https://api.themoviedb.org/3'
const search_api_pop = base_url +'/discover/movie?sort_by=popularity.desc&' + api_key;
const tv_season = 'https://api.themoviedb.org/3/tv/top_rated?api_key=7594db077d94ef4619043ef966d3e26d&language=en-US&page=90';
const slider_moives = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=7594db077d94ef4619043ef966d3e26d';

function App() {
  
  const [movies, setMovies] = useState([]);
  const [movieseason, setMoviesSeason] = useState([]);
  const [movieslider, setMoviesSlider] = useState([]);

  useEffect(()=>{
    fetch(search_api_pop).then((res)=>res.json())
    .then((data) =>{
        setMovies(data.results);
    });    
  },[]);

  useEffect(()=>{
    fetch(tv_season).then((res)=>res.json())
    .then((data) =>{
        setMoviesSeason(data.results);
    });
  },[]);

  useEffect(()=>{
    fetch(slider_moives).then((res)=>res.json())
    .then((data) =>{
        setMoviesSlider(data.results);
    });
  },[]);

  return (
    <Router>
      <div className="App">
          <Header movslider = {movieslider}/>
          <Routes>
            <Route exact path="/" element={<><Slider movslider = {movieslider}/><Sliderarrow movs = {movies}/><Listmoive movseason = {movieseason}/></>}></Route>
            <Route path="/search" element={<Search></Search>}></Route>
            <Route path="/watchmovie" element={<WatchMovie></WatchMovie>}></Route>
            <Route path="/:string" element={<><Slider movslider = {movieslider}/><Sliderarrow movs = {movies}/><Listmoive movseason = {movieseason}/></>}></Route>
          </Routes>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
