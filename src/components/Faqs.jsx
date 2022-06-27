import React, { useState } from 'react'
import styled from 'styled-components'
import faqsData from '../fixtures/faqs.json'
import closeIcon from '../assets/close-slim.png'
import addIcon from '../assets/add.png'


const Faqs = () => {
    const [toggleShowFaqs, setToggleShowFaqs] = useState({isActive: false, index: null})

    return (
        <Container>
            <Inner>
                <Title>Câu hỏi thường gặp</Title>
                <Frame>
                    {faqsData.map((item) => (
                        <Item key={item.id}>
                            <Header onClick={() => {
                                setToggleShowFaqs({ ...toggleShowFaqs, isActive: !toggleShowFaqs.isActive, index: item.id })
                            }}>
                                <HeaderTitle>{item.header}</HeaderTitle>
                                {(toggleShowFaqs.index === item.id && toggleShowFaqs.isActive) ? (
                                    <img src={closeIcon} alt="Close" />
                                ) : (
                                    <img src={addIcon} alt="Open" />
                                )}
                            </Header>
                            <Body className={(toggleShowFaqs.index === item.id && toggleShowFaqs.isActive) ? 'open' : ''}>
                                <Desc>{item.body}</Desc>
                            </Body>
                        </Item>
                    ))}
                </Frame>
            </Inner>
        </Container>
    )
}

export default Faqs

const Container = styled.div`
    margin: auto;
    border-bottom: 8px solid #222;
`

const Inner = styled.div`
    padding: 50px 5%;
    max-width: 1000px;
    margin: auto;
`
const Title = styled.h1`
    font-size: 48px;
    text-align: center;
    color: #fff;
`
const Frame = styled.div`
    margin-top: 40px;
    
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 1px;
    font-size: 26px;
    background: #303030;
    padding: .6em 1em;
    user-select: none;
    align-items: center;
    color: #fff;

    img {
    filter: brightness(0) invert(1);
    width: 18px;
    user-select: none;
        @media (max-width: 600px) {
            width: 20px;
        }
    }

    @media (max-width: 600px) {
    font-size: 16px;
    }
`
const HeaderTitle = styled.h2`
    font-size: 26px;
    font-weight: normal;
`

const Item = styled.div`
color: white;
margin: auto;
margin-bottom: 10px;
max-width: 728px;
width: 100%;
&:first-of-type {
    margin-top: 3em;
}
&:last-of-type {
    margin-bottom: 0;
}
`   

const Body = styled.div`
    background: #303030;
    color: #fff;
    padding: 1em 1em;
    font-weight: 400;
    font-size: 26px;
    transition: 1s ease-in-out;
    display: none;
    @media (max-width: 600px) {
        font-size: 16px;
    }
    &.open {
        display: block;
    }
`
const Desc = styled.p`
    font-weight: 400;
`