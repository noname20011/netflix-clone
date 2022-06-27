import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home, LogIn, SignUp, Player, Movie, TVShow, MovieDetail, UserSaved } from './pages'
import { Footer } from './components'

const App = () => {

    return (
        <>
            <Routes>
                <Route exact path={'/home'} element={<Home/>}/>
                <Route exact path={'/login'} element={<LogIn/>}/>
                <Route exact path={'/'} element={<SignUp/>}/>
                <Route exact path={'/player'} element={<Player/>}/>
                <Route exact path={'/movies'} element={<Movie/>}/>
                <Route exact path={'/tv'} element={<TVShow/>} />
                <Route exact path={'/movie/:movieName'} element={<MovieDetail/>}/>
                <Route exact path={'/mylist'} element={<UserSaved/>}/>
            </Routes>
            <Footer/>
        </>
    )
}

export default App;