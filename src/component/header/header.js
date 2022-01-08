import React from 'react';
import './header.css'
import Logo from '../../assets/img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'

function Header (){
    const [searchkey, setsearchkey] = useState('');
    const navigate = useNavigate();

    function showClickSearch(e) {
        const showSearch = document.querySelector(".js-search");
        showSearch.classList.toggle('active');
        e.stopPropagation();
    }
    
    function hideClickSearch(e) {
        const hideSearch = document.querySelector(".js-search");
        hideSearch.classList.remove('active');
        resetInputField();
    }
    
    function resetInputField (){
        setsearchkey("");
    }; 

    function stopSearch(e){
        e.stopPropagation();
    }
    
    const html = document.querySelector('html')
    html.addEventListener('click',hideClickSearch)
    
    function onScroll(e){
        const header = document.querySelector('.nav-header')
        window.scrollY >= 40 ? header.classList.add('scrolly') : header.classList.remove('scrolly');
    }
    
    document.addEventListener('scroll',onScroll)
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    function scrollToTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const onSubmitHandler = (e) =>
    {

        e.preventDefault();
        if(searchkey)
        {
            navigate('/search', {
                state: {searchkey:searchkey}
            });
        }
        setsearchkey('');
    }

    const onchangeHandler = (e) =>
    {
        setsearchkey(e.target.value)
    }

    function clickHideHeader() {  
        const $ = document.querySelector.bind(document)
        const hideChoose = document.querySelector('.choose-type-items')
        const hideIconArrow = document.querySelector('.active-arrow')
        if($('.choose-type-items.active')){
            hideChoose.classList.remove('active');
            hideIconArrow.classList.remove('active');
        }
    }
    
    return (
        <>
        <div className='header-slider'>
            <div className='nav-header' onClick={clickHideHeader}>
                <div className='logo' onClick={scrollToTop}>
                    <Link to='/'>
                        <img src={Logo} alt='123'/>
                        <span>Mov4K</span>
                    </Link>
                </div>
                <div className='navigation'>
                    <ul>
                        <Link to='/' className='nav-home'>
                            <li onClick={scrollToTop}>
                                <span>Home</span>
                            </li>  
                        </Link>  
                        <li  onClick={showClickSearch} >
                            <span>Search</span>
                            <div className='search-header js-search' onClick={stopSearch} >
                                <div>
                                    <form onSubmit={onSubmitHandler}>
                                        <i class="fas fa-search"></i>
                                        <input className='search-input' placeholder='Search...' value={searchkey} onChange={onchangeHandler}/>
                                    </form>
                                    <i class="fas fa-times" onClick={hideClickSearch}></i>
                                </div>
                            </div>
                        </li>    
                        <li>
                            <div class="theme-switch-wrapper" onClick={switchTheme}>
                                <label class="theme-switch" for="checkbox">
                                    <input type="checkbox" id="checkbox" />
                                    <div class="slider-ar round"></div>
                                </label>
                            </div>
                        </li>
                    </ul> 
                </div>
            </div>
            
        </div>
    </>
);
}
export default Header;

