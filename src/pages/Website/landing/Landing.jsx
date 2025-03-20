import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import "../Home.css";
import 'swiper/swiper-bundle.css';
import { useMediaQuery } from '@uidotdev/usehooks';
import { StyledHome } from '../Style/Homepage';

const Landing = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width: 769px) and (max-width: 992px)"
    );

    useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        // تنظيف السلايدر عندUnmounting المكون
        return () => {
            swiper.destroy();
        };
    }, []);

    return (
        <StyledHome
            isSmallDevice={isSmallDevice}
            isMediumDevice={isMediumDevice}
        >
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img src={require("../../../images/mockup-free-y0v7iHHz4ZQ-unsplash.jpg")} alt="" />
                    </div>
                    <div className="swiper-slide">
                        <img src={require("../../../images/OIP (1).jpeg")} alt="" />
                    </div>
                    <div className="swiper-slide">
                        <img src={require("../../../images/mockup-free-y0v7iHHz4ZQ-unsplash.jpg")} alt="" />
                    </div>
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
            <style>
                {`
                    .swiper-pagination-bullet {
                        background-color: #fff; /* لون النقاط */
                    }
                    .swiper-button-prev, .swiper-rtl .swiper-button-next{
                        top: 55%;
                        color:white
                    }
                    .swiper-button-next, .swiper-rtl .swiper-button-prev{
                        top: 55%;
                    }
                `}
            </style>
        </StyledHome>
    );
}

export default Landing;
