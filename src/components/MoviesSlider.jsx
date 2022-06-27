import React from 'react'
import styled from 'styled-components'
import MoviesCard from './movies/MoviesCard'

const MoviesSlide = ({ movies }) => {
    
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to)
    }

    return (
        <Container>
            <MoviesCard title='Xem nhiều nhất' data={getMoviesFromRange(0, 10)}/>
            <MoviesCard title='Mới nhất  ' data={getMoviesFromRange(10, 20)}/>
            <MoviesCard title='Bom Tấn' data={getMoviesFromRange(20, 30)}/>
            <MoviesCard title='Phổ biến' data={getMoviesFromRange(30, 40)}/>
            <MoviesCard title='Hành động' data={getMoviesFromRange(40, 50)}/>
            <MoviesCard title='Sử thi' data={getMoviesFromRange(50, 60)}/>
        </Container>
    )
}

export default MoviesSlide

const Container = styled.div`
    border-bottom: 8px solid #222;
`