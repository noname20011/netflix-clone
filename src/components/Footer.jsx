import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <Container>
            <Title>Question? Contact us.</Title>
            <Break/>
            <Row>
                <Column>
                    <Link href="##">FAQ</Link>
                    <Link href="##">Investor Relations</Link>
                    <Link href="##">Privacy</Link>
                    <Link href="##">Speed Test</Link>
                </Column>
                <Column>
                    <Link href="##">Help Center</Link>
                    <Link href="##">Investor Relations</Link>
                    <Link href="##">Privacy</Link>
                    <Link href="##">Speed Test</Link>
                </Column>
                <Column>
                    <Link href="##">Help Center</Link>
                    <Link href="##">Investor Relations</Link>
                    <Link href="##">Privacy</Link>
                    <Link href="##">Speed Test</Link>
                </Column>
                <Column>
                    <Link href="##">Help Center</Link>
                    <Link href="##">Investor Relations</Link>
                    <Link href="##">Privacy</Link>
                    <Link href="##">Speed Test</Link>
                </Column>
            </Row>
            <Break/>
            <SelectLanguage>
                <Language>English</Language>
                <Language>Vietnam</Language>
            </SelectLanguage>
            <Break/>
            <Text>Netflix Vietnam</Text>
        </Container>
    )
}

export default Footer

export const Container = styled.div`
    display: flex;
    padding: 70px 56px 40px;
    margin: auto;
    max-width: 1000px;
    flex-direction: column;

    @media(max-width: 1000px) {
        padding: 70px 30px;
    }
`
export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;

    @media(max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`

export const Link = styled.a`
    color: #757575;
    margin-bottom: 16px;
    font-size: 13px;
    width: 100%;

    &:hover {
        text-decoration: revert;
    }
`

export const Title = styled.h2`
    color: #757575;
    margin-bottom: 40px;
    font-size: 16px;
`
export const Text = styled.p`
    color: #757575;
    margin: 40px 0 0;
    font-size: 13px;
`

export const SelectLanguage = styled.select`
    margin-top: 20px;
    padding: 20px 30px;
    color: #757575;
    background-color: #000;
    border-radius: 3px; 
    width: 140px;

    &:focus {
        outline: white;
        border: 2px solid #fff;
    }

    @media(max-width: 600px) {
        padding: 10px 20px;
        font-size: 12px;

        &>option {
            font-size: 12px;
        }
    }
`
export const Language = styled.option`
    font-size: 14px;
    color: #757575;
`

export const Break = styled.div`
    flex-basis: 100%;
    height: 0;
`