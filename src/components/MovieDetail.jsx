import React from 'react'
import styled from 'styled-components'

const MovieDetail = ({ movie }) => {
    return (
        <Container>
            {Object.keys(movie).length === 0 ? 
            (
                <div className='loading'>Loading ...</div>
            ) : 
            (
                <><div className='movie-left'>
                        <div className='movie-title'>
                            <h2>{movie.name}</h2>
                        </div>
                        <div className='movie-rating'>
                            <span>
                                IMDB Vote Average <i className='fa fa-star'></i>: {movie.vote_average}
                            </span>
                            <span>
                                IMDB Votes <i className='fa fa-thumbs-up'></i>: {movie.vote_count}
                            </span>
                            <span>
                                Popularity <i className='fa fa-film'></i>: {movie.popularity}
                            </span>
                            <span>
                                Year <i className='fa fa-calendar'></i>: {movie.release_date}
                            </span>
                        </div>
                        <div className='movie-plot'>{movie.desc} Famous for an incident that happened at his birth, Harry makes friends easily at his new school. He soon finds, however, that the wizarding world is far more dangerous for him than he would have imagined, and he quickly learns that not all wizards are ones to be trusted.    </div>
                        <div className='movie-info'>
                            <div>
                                <span>Direction </span>
                                <span>Chris Columbus</span>
                            </div>
                            <div>
                                <span>Star </span>
                                <span>Daniel Radcliffe, Rupert Grint, Richard Harris</span>
                            </div>
                            <div>
                                <span>Genres </span>
                                <span>{movie.genres.map(genre => genre+ " ")}</span>
                            </div>
                            <div>
                                <span>Language </span>
                                <span>English, Latin</span>
                            </div>
                            <div>
                                <span>Awards </span>
                                <span>Nominated for 3 Oscars. 17 wins & 69 nominations total</span>
                            </div>
                        </div>
                    </div><div className='movie-right'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.name} />
                        </div></>
            )}
        </Container>
    )
}

export default MovieDetail

const Container = styled.div`
    padding: 160px 0 120px; 
    color: #fff; 
    display: flex;
    justify-content: center;
    .movie-left, .movie-right {
        flex: 1;
    }

    .movie-title>h2 {
        font-size: 60px;
        font-weight: 400;
    }


    .movie-rating {
        padding-left: 4px;
        margin-top: 8px;
        color: #79b8f3;
        span {
            margin-right: 12px;
        }

        .fa-star {
            color: orange;
        }

        .fa-thumbs-up {
            color: #fff;
        }

        .fa-film {
            color: darkslategrey;
        }

        .fa-calendar {
            color: bisque;
        }
    }

    .movie-plot {
        margin-top: 40px;
        line-height: 1.6;
    }

    .movie-info {
        margin-top: 40px;
    }

    .movie-info>div span:first-child {
        padding: 10px 0;
        font-weight: 600;
        width: 100px;
        display: inline-block;
        color: #fff;
    }

    .movie-info>div span {
        color: #79b8f3;
    }

    .movie-right {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading {
        font-size: 20px;
    }
`

