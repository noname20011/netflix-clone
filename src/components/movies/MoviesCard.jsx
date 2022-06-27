import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from './movie/Card'
import Loader from '../Loader'

const MoviesCard = ({ title, data }) => {
    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);
    const [showControls, setShowControls] = useState(false);

    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if (direction === "left" && sliderPosition > 0) {
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
        setSliderPosition(sliderPosition - 1);
        }
        if (direction === "right" && sliderPosition < 4) {
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        setSliderPosition(sliderPosition + 1);
        }
    }   

    return (
        <Container className='flex column'
            showControls={showControls}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {Object.keys(data).length === 0 ? (
                <div className='flex a-center j-center'>
                    <Loader/>
                </div>
            ) : (
                <>
                <h1>{title}</h1>
                <div className="wrapper">
                    <div className={`slider-action left ${ !showControls ? "none" : ""} flex j-center a-center`}>
                        <AiOutlineLeft onClick={() => handleDirection("left")} />
                    </div>   
                    <div className="flex slider" ref={listRef}>
                        {
                            data?.map((movie, index) => (
                                <Card key={movie.id} movieData={movie} index={index}/>
                            ))
                        }
                    </div>
                    <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}>
                        <AiOutlineRight onClick={() => handleDirection("right")} />
                    </div>
                </div> 
                </>
            )}
        </Container>
    )
}

export default MoviesCard

const Container = styled.div`
    gap: 1rem;
    position: relative;
    padding: 2rem 0;
    h1 {
        margin-left: 50px;
    }
    .wrapper {
        margin: 0 50px;
        over-flow: hidden;
        .slider {
            width: max-content;
            gap: 1rem;
            transform: translateX(0px);
            transition: 0.3s ease-in-out;
        }
        .slider-action {
            margin: 0 40px;
            position: absolute;
            z-index: 999;
            top: 50%;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #999;
            transition: 0.3s ease-in-out;
            cursor: pointer;
        svg {
            font-size: 2rem;
        }
        }
        .none {
            display: none;
        }
        .left {
            left: 0;
        }
        .right {
            right: 0;
        }
    }
`