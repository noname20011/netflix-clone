import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchDataByGenre, removeAsyncDataByGenre } from '../store/reducers/movieSlice'
import styled from 'styled-components'

const SelectGenre = ({ genres, type }) => {
    const dispatch = useDispatch()

    return(
        <Container className='flex a-center'> 
            <span>Thể loại</span>    
            <Select onChange={(e) => {
                dispatch(fetchDataByGenre({genres, genre: e.target.value, type }))
                dispatch(removeAsyncDataByGenre())
            }}>
                {genres?.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </Select>
        </Container>
    )
}

export default SelectGenre

const Container = styled.div`
    margin-left: 50px;
    gap: 1rem;
`

const Select = styled.select`
    position: relative;
    display: block;
    width: 124px;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
    font-size: 18px;
    color: #60666d;
`