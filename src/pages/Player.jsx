import React from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from '../assets/video.mp4'

const Player = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <div className="player">
                <div className="back flex a-center j-center"
                    onClick={() => navigate(-1)}
                >
                    <BsArrowLeft/>
                </div>
                <video src={video} loop autoPlay controls></video>
            </div>
        </Container>
    )
}

export default Player

const Container  = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .back {
        position: absolute;
        top 10%;
        left: 2%;
        z-index: 100;
        cursor: pointer;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #999;
        svg {
            font-size: 28px;
        }
    }
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`