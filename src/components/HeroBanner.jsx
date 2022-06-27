import React from 'react'
import styled from 'styled-components'
import homeBackgroundImg from '../assets/home.jpg'
import homeTitleImg from '../assets/homeTitle.webp'
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <img src={homeBackgroundImg} alt="Doctor Strange" className='background-image'/>
            <div className="container">
                <div className="title-logo">
                    <img src={homeTitleImg} alt="Doctor Strange" />
                </div>
                <div className="button flex">
                    <button className="flex a-center j-center" 
                        onClick={() => navigate('/player')}>
                        <FaPlay/> Play
                    </button>
                    <button className="flex a-center j-center">
                        <AiOutlineInfoCircle/> Xem chi tiết
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default HeroBanner

const Container = styled.div`
    position: relative;
    .background-image {
        width: 100%;
        height: 100%;
        filter: brightness(0.6);
        object-fit: contain ;
    }
    .container {
        position: absolute;
        top: 30%;
        left: 100px;    
        img {
            width: 100%;
            height: 100%;
            margin-left: 5rem;
        }
        .button {
            bottom: 5rem;
            margin: 4rem 10rem ;
            gap: 2rem;
            button {
                font-size: 1.4rem;
                gap: 1rem;
                border-radius: 0.2rem;
                padding: 0.5rem;
                padding-left: 2rem;
                padding-right: 2.4rem;
            }
            button:hover {
                opacity: 0.8;
            }
            button:nth-of-type(2) {
                background-color: rgba(109, 109, 110, 0.7);
                color: white;
                svg {
                    font-size: 1.8rem;
                }
        }
    }
`