import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Navbar, HeroBanner, MoviesSlider } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllGenres, fetchAllMovies, fetchUserData, getAllMovies } from '../store/reducers/movieSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const [iScroll, setIScroll] = useState(false)
    const [email, setEmail] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const genresLoaded = useSelector((state) => state.movies.genresLoaded);
    const movies = useSelector(getAllMovies)


    useEffect(() => {
        dispatch(fetchAllGenres())
        if(email) dispatch(fetchUserData(email))
    }, [dispatch, email])

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchAllMovies({ type: "all" }));   
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
            <HeroBanner/>  
            <div className="data">
                <MoviesSlider movies={movies}/>
            </div>
        </Container>
    )
}

export default Home

const Container = styled.div`
    background-color: black;
    .data {
        margin-top: 100px;
    }
`

