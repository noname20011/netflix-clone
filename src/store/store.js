import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from "./reducers/movieSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
})

