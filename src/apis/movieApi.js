import axios from 'axios'
import { TMDB_BASE_URL } from '../constants/constant'

export default axios.create({
    baseURL: TMDB_BASE_URL
})
