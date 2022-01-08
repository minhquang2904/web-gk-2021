import React from "react";
import './footer.css';
import Logo from '../../assets/img/logo.png';
import { Link } from "react-router-dom";

window.onscroll = function() {
    scrollFunction()
}

function scrollFunction(){
    const backToTop = document.getElementById("scroll-top")
    if(document.body.scrollTop > 600 || document.documentElement.scrollTop > 600){
        backToTop.style.visibility = "visible";
    }
    else{
        backToTop.style.visibility = "hidden";
    }
}

function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

function clickHideFooter() {  
    const $ = document.querySelector.bind(document)
    const hideChoose = document.querySelector('.choose-type-items')
    const hideIconArrow = document.querySelector('.active-arrow')
    if($('.choose-type-items.active')){
        hideChoose.classList.remove('active');
        hideIconArrow.classList.remove('active');
    }
}

const Footer = () => (
    <div className="footer-page" onClick={clickHideFooter}> 
        <div className="footer-moive">
            <div className="logo-footer">
                <div className='logo'>
                    <Link to='/' onClick={scrollToTop}>
                        <img src={Logo} alt='123'/>
                        <span>Mov4K</span>
                    </Link>
                </div>
            </div>
            <div className="contact-footer">
                <a href="https://www.facebook.com/minhquang.luong.526/" className="contact-face"><i class="fab fa-facebook"></i>Facebook</a>
                <span className="contact-email"><i class="fas fa-envelope"></i>Email</span>
                <span className="contact-phone"><i class="fas fa-phone-square-alt"></i>Phone</span>
            </div>
        </div>
        <div id="scroll-top" className="back-to-top" onClick={scrollToTop}>
            <i class="fas fa-chevron-up"></i>
        </div>
    </div>
)

export default Footer;