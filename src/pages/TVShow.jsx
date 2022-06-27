import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Navbar, MoviesSlider, SelectGenre } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllGenres, fetchAllMovies, fetchUserData, getAllGenres, getAllMovies, removeAsyncMovies } from '../store/reducers/movieSlice'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'

const TVShow = () => {
    const [iScroll, setIScroll] = useState(false)
    const [email, setEmail] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const genresLoaded = useSelector((state) => state.movies.genresLoaded);
    const genres = useSelector(getAllGenres)
    const movies = useSelector(getAllMovies)

    useEffect(() => {
        dispatch(fetchAllGenres())
        if(email) dispatch(fetchUserData(email))
    }, [email, dispatch])

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchAllMovies({ type: "tv" }));
            dispatch(removeAsyncMovies())
        }
    }, [genresLoaded]);

    window.onscroll = () => {
        setIScroll(window.pageYOffset === 0 ? false : true)
        return () => window.onscroll = null
    }

    onAuthStateChanged(firebaseAuth, (currUser) => {
        if(currUser) setEmail(currUser.email)
        else navigate('/')
    })

    return (
        <Container>
            <Navbar isScroll={iScroll}/>
            <div className="data">
                <SelectGenre genres={genres} type='movie'/>
                <MoviesSlider movies={movies}/>
            </div>
        </Container>
    )
}

export default TVShow

const Container = styled.div`
    background-color: black;
    .data {
        margin-top: 200px;
        .not-available {
            font-size: 14px;
            color: #fff;
            text-align: center;
        }
    }
`