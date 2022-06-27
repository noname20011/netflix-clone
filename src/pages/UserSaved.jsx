import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Navbar, Card, Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, removeAsyncUserData, getUserData } from '../store/reducers/movieSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'

const UserSaved = () => {
    const navigate = useNavigate()
    const [iScroll, setIScroll] = useState(false)
    const [email, setEmail] = useState(null)
    const userData = useSelector(getUserData)
    let renderMovie = ''

    renderMovie = userData.response === true 
    ? (userData.data.savedMovie.length > 0 ? 
        userData?.data?.savedMovie?.map(movie => <Card movieData={movie} saved={true}/>)
        : <div className='flex a-center message'>Không có phim nào được thêm vào danh sách yêu thích.</div>) 
    : <div className='flex a-center message'><Loader/></div>    

    const dispatch = useDispatch()

    onAuthStateChanged(firebaseAuth, (currUser) => {
        if(currUser) setEmail(currUser.email)
        else navigate('/')
    })


    useEffect(() => {
        if(email) {
            dispatch(fetchUserData(email))
            dispatch(removeAsyncUserData())
            console.log(email);
        }
    }, [email])


    window.onscroll = () => {
        setIScroll(window.pageYOffset === 0 ? false : true)
        return () => window.onscroll = null
    }
    return (
        <Container>
            <Navbar isScroll={iScroll}/>
            <div className="data content flex column">
                <h1>Phim yêu thích của tôi</h1>
                {  Object.keys(renderMovie).length === 0 
                    ? (
                        <div className="flex a-center j-center">
                            <Loader/>
                        </div>
                    ) : (
                        <div className="grid flex">
                            {renderMovie}
                        </div>
                    )
                }
        </div>
            </Container>
    )
}

export default UserSaved

const Container = styled.div`
    border-bottom: 8px solid #222;
    background-color: black;
    .data {
        margin: 160px 120px 0;
        padding: 0 0 120px; 
        h1 {
            font-size: 36px;
            color: #fff;
            margin-bottom: 60px;
        }
        .message {
            margin: 0 auto;
        }
        .flex {
            flex-wrap: wrap;
            gap: 2rem;
        }
    }
`