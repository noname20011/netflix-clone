import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'


const Header = ({ isShowButton }) => {
    const navigate = useNavigate()

    return (
        <Container className='flex a-center j-between'> 
            <Link to={'/'} className="logo">
                <img src={logo} alt="logo-netflix" />
            </Link>
            { isShowButton && <button onClick={() => navigate('/login')}>Đăng nhập</button> }
        </Container>
    )
}

export default Header

const Container = styled.div`
    padding: 0 1rem;
    .logo {
        img {
            height: 6rem;
        }
    }
    button {
        padding: .5rem 1rem;
        background-color: #e50914;
        color: #fff;
    }
`