import React from 'react'
import styled from 'styled-components'
import backGroundImg from '../assets/login.jpg'

const BackgroundImg = () => {
    return (
        <Container>
            <img src={backGroundImg} alt="netflix"  />
        </Container>
    )
}

export default BackgroundImg

const Container = styled.div`
    height: 100vh;
    width: 100%;
    img {
        height: inherit;
        width: inherit;
        object-fit: cover;
    }
`