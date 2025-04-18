import React, { useEffect, useMemo } from 'react';
import Swiper from 'swiper/bundle';
import "../Home.css";
import 'swiper/swiper-bundle.css';
import { useMediaQuery } from '@uidotdev/usehooks';
import { StyledHome } from '../Style/Homepage';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for feature buttons
const FeaturesContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    margin-bottom: 30px;
    max-width: 1200px;
    width: 95%;
    margin: 0 auto 30px auto;
    position: relative;
    z-index: 10;
    
    @media (max-width: 768px) {
        padding: 15px;
        gap: 10px;
        flex-direction: column;
    }
`;

const FeatureButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: none;
    border-radius: 12px;
    padding: 15px 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    flex: 1;
    min-width: 150px;
    max-width: 220px;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        background-color: #f0f0f0;
    }
    
    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        gap: 15px;
        padding: 12px 15px;
    }
`;

const FeatureIcon = styled.div`
    font-size: 24px;
    margin-bottom: 10px;
    color: #007bff;
    
    @media (max-width: 768px) {
        margin-bottom: 0;
        font-size: 20px;
    }
`;

const FeatureText = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    text-align: center;
    position: relative; 
    
    @media (max-width: 768px) {
        font-size: 14px;
        text-align: left;
    }
`;

// Shop Now button styling
const ShopNowButton = styled.button`
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 12px 28px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    letter-spacing: 1px;
    text-transform: uppercase;
    
    &:hover {
        background-color: #0056b3;
        transform: translateX(-50%) scale(1.05);
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }
    
    @media (max-width: 768px) {
        bottom: 10%;
        padding: 10px 20px;
        font-size: 16px;
    }
`;

// Custom Navigation Arrows
const NavigationArrow = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    border-radius: 50%;
    color: white;
    font-size: 36px;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    
    &.swiper-button-prev {
        left: 3%;
    }
    
    &.swiper-button-next {
        right: 3%;
    }
    
    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        font-size: 20px;
        &.swiper-button-prev {
            left: 3%;
        }
        &.swiper-button-next {
            right: 3%;
        }
    }
    
    @media (max-width: 480px) {
        width: 35px;
        height: 35px;
        font-size: 18px;
        &.swiper-button-prev {
            left: 2%;
        }
        &.swiper-button-next {
            right: 2%;
        }
    }
`;

const SwiperContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 auto 40px auto;
    overflow: hidden;

    .swiper-wrapper {
        @media (max-width: 768px) {
            height: 500px !important;
        }
        height: 750px !important;
    }
`;

const SwiperSlide = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    @media (min-width: 1024px) {
        height: 700px;
    }
`;

const Landing = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width: 769px) and (max-width: 992px)"
    );
    const navigate = useNavigate();

    // Memoize image imports to prevent re-processing on every render
    const slideImages = useMemo(() => [
        {
            src: require("../../../images/headphones-displayed-against-dark-background.jpg"),
            alt: "Slide 1",
            path: '/categories?type=featured',
            buttonText: "Shop Now"
        },
        {
            src: require("../../../images/view-illuminated-neon-gaming-desk-setup-with-3d-glasses.jpg"),
            alt: "Slide 2",
            path: '/categories?type=newArrivals',
            buttonText: "New Arrivals"
        },
        {
            src: require("../../../images/stylish-black-gaming-controller-featuring-four-redaccented-buttons-captured-against-dark-background-exuding-futuristic-vibe_29120-40342.jpg"),
            alt: "High Quality Product",
            path: '/categories?type=bestSellers',
            buttonText: "Best Sellers"
        }
    ], []); 

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

        return () => {
            swiper.destroy();
        };
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <StyledHome
            isSmallDevice={isSmallDevice}
            isMediumDevice={isMediumDevice}
        >
            <FeaturesContainer>
                <FeatureButton onClick={() => handleNavigate('/categories?type=sports')}>
                    <FeatureIcon>🏀</FeatureIcon>
                    <FeatureText>Sports Equipment</FeatureText>
                </FeatureButton>
                <FeatureButton onClick={() => handleNavigate('/categories?type=electronics')}>
                    <FeatureIcon>💻</FeatureIcon>
                    <FeatureText>Electronics</FeatureText>
                </FeatureButton>
                <FeatureButton onClick={() => handleNavigate('/categories?type=gaming')}>
                    <FeatureIcon>🎮</FeatureIcon>
                    <FeatureText>Gaming</FeatureText>
                </FeatureButton>
                <FeatureButton onClick={() => handleNavigate('/categories?type=accessories')}>
                    <FeatureIcon>🎧</FeatureIcon>
                    <FeatureText>Accessories</FeatureText>
                </FeatureButton>
            </FeaturesContainer>

            <SwiperContainer className="swiper-container">
                <div className="swiper-wrapper">
                    {slideImages.map((slide, index) => (
                        <SwiperSlide key={index} className="swiper-slide">
                            <img src={slide.src} alt={slide.alt} />
                            <ShopNowButton onClick={() => handleNavigate(slide.path)}>
                                {slide.buttonText}
                            </ShopNowButton>
                        </SwiperSlide>
                    ))}
                </div>
                <div className="swiper-pagination"></div>
                <NavigationArrow className="swiper-button-prev">❮</NavigationArrow>
                <NavigationArrow className="swiper-button-next">❯</NavigationArrow>
            </SwiperContainer>

            <style>
                {`
                    .swiper-pagination-bullet {
                        background-color: #fff;
                        width: 12px;
                        height: 12px;
                        opacity: 0.7;
                    }
                    .swiper-pagination-bullet-active {
                        background-color: #007bff;
                        opacity: 1;
                    }
                    .swiper-button-prev:after, .swiper-button-next:after {
                        display: none;
                    }
                `}
            </style>
        </StyledHome>
    );
};

export default Landing;