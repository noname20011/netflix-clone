import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../../../utils/firebase-config'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail, fetchUserData, getUserData, removeAsyncMovieDetail } from '../../../store/reducers/movieSlice';
import { IoPlayCircleSharp } from "react-icons/io5";
import { GiBrokenHeart } from "react-icons/gi";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import axios from 'axios';
import { MONGODB_API_URL } from '../../../constants/constant';

const Card = ({ movieData, saved = false }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false)
    const [email, setEmail] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)
    const [isSaved, setIsSaved] = useState(saved)
    const dispatch = useDispatch()
    const userData = useSelector(getUserData)

    onAuthStateChanged(firebaseAuth, (currUser) => {
        if(currUser) setEmail(currUser.email)
        else navigate('/')
    })


    useEffect(() => {
        userData?.data?.likedMovie.find(movie => movie.id === movieData.id) && setIsLiked(true)
        userData?.data?.dislikedMovie.find(movie => movie.id === movieData.id) && setIsDisliked(true)
        userData?.data?.savedMovie.find(movie => movie.id === movieData.id) && setIsSaved(true)
    }, [email])

    const addMovieToLikedList = async () => {
        try {
            await axios.post(`${MONGODB_API_URL}/add/like`, { email, movie: movieData })
        } catch (error) {
            console.log(error.message);
        }
    }

    const addMovieToDislikedList = async () => {
        try {
            await axios.post(`${MONGODB_API_URL}/add/dislike`, { email, movie: movieData })
        } catch (error) {
            console.log(error.message);
        }
    }

    const addMovieFromSavedList = async () => {
        try {
            await axios.post(`${MONGODB_API_URL}/save/add`, { email, movie: movieData })
        } catch (error) {
            console.log(error.message);
        }
    }

    const removeMovieFromSavedList = async () => {
        try {
            await axios.delete(`${MONGODB_API_URL}/save/delete/${email}/${movieData.id}`)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt={movieData.name} />

            {isHovered && (
            <div className="hover">
                <div className="image-video-container">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieData.poster}`}
                        alt="card"
                        onClick={() => navigate("/player")}
                    />
                </div>
                <div className="info-container flex column">
                    <h3 className="name" onClick={() => navigate("/player")}>
                        {movieData.name}
                    </h3>
                    <div className="icons flex j-between">
                        <div className="controls flex">
                            <IoPlayCircleSharp
                                title="Play"
                                onClick={() => navigate("/player")}
                            />
                            <RiThumbUpFill className={ isLiked ? 'active' : ''} title="Thích" onClick={addMovieToLikedList}/>
                            <RiThumbDownFill className={ isDisliked ? 'active' : ''} title="Không thích" onClick={addMovieToDislikedList} />
                            {isSaved ? (
                            <GiBrokenHeart className='remove-saved-icon' title="Xóa khỏi danh sách yêu thích"
                                onClick={removeMovieFromSavedList}/>
                            ) : (
                            <BsFillHeartFill className='saved-icon' title="Thêm vào danh sách yêu thích" 
                                onClick={addMovieFromSavedList}/>
                            )}
                        </div>
                        <Link to={`/movie/${movieData.name}`}>
                            <div className="info" onClick={() => {
                                dispatch(fetchMovieDetail(movieData))
                                dispatch(removeAsyncMovieDetail())
                            }}>
                                <BsFillInfoCircleFill title="Chi tiết" />
                            </div>
                        </Link>
                    </div>
                    <div className="genres flex">
                        <ul className="flex">
                            {movieData.genres.map((genre) => (
                                <li>{genre}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            )}
        </Container>
    )
}

export default Card

const Container = styled.div`
    max-width: 360px;
    width: 320px;
    height: 100%;
    cursor: pointer;
    position: relative;
    img {
        border-radius: 0.2rem;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .hover {
        z-index: 99;
        height: max-content;
        width: 20rem;
        position: absolute;
        top: -11vh;
        left: 0;
        border-radius: 0.3rem;
        box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 0.3s ease-in-out;
        .image-video-container {
            position: relative;
            height: 140px;
            img {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
        }
        .info-container {
        padding: 1rem;
        gap: 0.5rem;
        }
        .icons {
            .controls {
                display: flex;
                gap: 1rem;
            }
            svg {
                font-size: 2rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &.active {
                    color: #66b3fc;
                }
                &.saved-icon {
                    color: #fa4e4e;
                    &.saved-icon:hover {
                        opacity: .6;
                    }
                }
                &.remove-saved-icon {
                    color: #fab54e;
                    &.remove-saved-icon:hover {
                        opacity: .6;
                    }
                }
                &:hover {
                color: #b8b8b8;
            }
        }
        a {
            color: #fff;
            &:hover {
                color: #b8b8b8;
            }
        }
    }
        .genres {
        ul {
            font-size: 12px;
            margin-top: 16px;
            gap: 1rem;
            li {
            padding: .3rem;
            background-color: #333;
            border-radius: 4px;
            }
        }
        }
    }
`;