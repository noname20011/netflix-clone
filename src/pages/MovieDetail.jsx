import React from 'react'
import styled from 'styled-components'
import { Navbar, MovieDetailLayOut } from '../components'
import { useSelector } from 'react-redux'
import { getMovieDetail } from '../store/reducers/movieSlice'


const MovieDetail = () => {

    const movie = useSelector(getMovieDetail)

    return (
        <Container>
            <Navbar/>
            <div className="data">
                <MovieDetailLayOut movie={movie}/>
            </div>
        </Container>
    )
}

export default MovieDetail

const Container = styled.div`
    border-bottom: 8px solid #222;
    .data {
        margin: 0 160px;
        padding: 0 0 120px; 
    }
`