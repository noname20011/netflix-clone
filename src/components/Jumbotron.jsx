import React from 'react'
import styled from 'styled-components'
import jumboData from '../fixtures/jumbo.json'


const Jumbotron = () => {
    return (
        <Container>
            {jumboData.map(item => (
                <Item key={item.id}>
                    <Inner direction={item.direction}>
                        <Pane>
                            <Title>{item.title}</Title>
                            <SubTitle>{item.subTitle}</SubTitle>
                        </Pane>
                        <Pane>
                            <Image src={item.image} alt={item.alt}></Image>
                        </Pane>
                    </Inner>
                </Item>
            ))}
        </Container>
    )
}

export default Jumbotron

const Item = styled.div`
    display: flex;
    border-bottom: 8px solid #222;
    padding: 50px 5%;
    color: white;
    overflow: hidden;
`

const Inner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: ${({direction}) => direction};
    max-width: 1100x;
    margin: auto;
    width: 100%;
    column-gap: 12px;
    max-width: 1100px;
    
    @media(max-width: 1000px) {
        flex-direction: column;
    }
`

const Container = styled.div`
    
    margin: 0 auto;

    @media(max-width: 1000px) {
        ${Item}:last-of-type h2 {
            margin-bottom: 50px;
        }
    }
`

const Pane = styled.div`
    width: 50%;
    padding: 0 30px;

    @media(max-width: 1000px) {
        width: 100%;
        padding: 0 25px;
        text-align: center;
    }
`

const Title = styled.h2`
    font-size: 50px;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 8px;

    @media(max-width: 600px) {
        font-size: 35px;
    }
`

const SubTitle = styled.span`
    font-size: 26px;
    font-weight: normal;
    line-height: 1.4;

    @media(max-width: 600px) {
        font-size: 18px;
    }
`

const Image = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: cover;
`