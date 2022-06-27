import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import movieAPI from '../../apis/movieApi'
import { KEY_TMDB_API, MONGODB_API_URL, TMDB_BASE_URL } from '../../constants/constant'

const initialState = {
    user: {},
    movie: {},
    movies: [],
    genresLoaded: false,
    genres: []
}

// Use commonly
const createArrFromRawData = (results, moviesArray, genres) => {
    results.forEach(movie => {
        const movieGenres = []
        movie.genre_ids.forEach(genre => {
            const name = genres.find(({ id }) => id === genre)
            if(name) movieGenres.push(name.name)
        })
        if(movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                poster: movie.poster_path,
                desc: movie.overview,
                popularity: movie.popularity,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                genres: movieGenres.slice(0, 3),
            })
        }
    })
}   

const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const { data: { results }} = await movieAPI.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};
// End use commonly

export const fetchAllGenres = createAsyncThunk(
    'movies/fetchAllGenres',
    async () => {
        const { data } = await movieAPI.get(`/genre/movie/list?api_key=${KEY_TMDB_API}`)
        return data.genres
    }
)

export const fetchAllMovies = createAsyncThunk(
    'movies/fetchAllMovies',
    async ({ type }, thunkApi) => {
        const { movies: { genres } } = await thunkApi.getState()
        return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${KEY_TMDB_API}`, genres, true)
    }
)

export const fetchDataByGenre = createAsyncThunk(
    "movies/fetchDataByGenre",
    async ({ genre, type }, thunkAPI) => {
        const { movies: { genres }} = thunkAPI.getState();
        return getRawData(`https://api.themoviedb.org/3/discover/${type}?api_key=${KEY_TMDB_API}&with_genres=${genre}`, genres)
        
    }
)

export const fetchMovieDetail = createAsyncThunk(
    'movies/fetchMovieDetail',
    (movie) => movie
)

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (email) => {
        const { data } = await axios.patch(`${MONGODB_API_URL}/${email}`)
        return { ...data }
    }
)



const movieSlice = createSlice({
    name: 'Netflix',
    initialState,
    reducers : {
        removeAsyncMovies: (state) => {
            state.movies = []
        },
        removeAsyncDataByGenre: (state) => {
            state.movies = []
        },
        removeAsyncMovieDetail: (state) => {
            state.movie = {}
        },
        removeAsyncUserData: (state) => {
            state.user = {}
        }
    },
    extraReducers: {
        //Genres
        [fetchAllGenres.pending]: () => {
            console.log('Loading...');
        },
        [fetchAllGenres.fulfilled]: (state, { payload }) => {
            return { ...state, genresLoaded: true, genres: payload }
        },
        [fetchAllGenres.rejected]: (state) => {
            state.genresLoaded = false
        },

        // Movies
        [fetchAllMovies.pending]: () => {
            console.log('Loading...');
        },
        [fetchAllMovies.fulfilled]: (state, { payload }) => {
            return { ...state, movies: payload }
        },
        [fetchAllMovies.rejected]: () => {
            console.log('Loading fail!');
        },

        // MoviesByGenre
        [fetchDataByGenre.pending]: () => {
            console.log('Loading...');
        },
        [fetchDataByGenre.fulfilled]: (state, { payload }) => {
            return { ...state, movies: payload }
        },
        [fetchDataByGenre.rejected]: () => {
            console.log('Loading fail!');
        },

        //MovieDetail 
        [fetchMovieDetail.pending]: () => {
            console.log('Loading...');
        },
        [fetchMovieDetail.fulfilled]: (state, { payload }) => {
            return { ...state, movie: { ...payload } }
        },
        [fetchMovieDetail.rejected]: () => {
            console.log('Loading fail!');
        },

        //UserData
        [fetchUserData.pending]: () => {
            console.log('Loading...');
        },
        [fetchUserData.fulfilled]: (state, { payload }) => {
            return { ...state, user: { ...payload } }
        },
        [fetchUserData.rejected]: () => {
            console.log('Loading fail!');
        }
    }
})

export const { 
    removeAsyncMovies, 
    removeAsyncDataByGenre,
    removeAsyncMovieDetail,
    removeAsyncUserData } = movieSlice.actions
export const getAllGenres = (state) => state.movies.genres
export const getAllMovies = (state) => state.movies.movies
export const getMovieDetail = (state) => state.movies.movie
export const getUserData = (state) => state.movies.user
export default movieSlice.reducer