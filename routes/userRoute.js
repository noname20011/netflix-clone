import express from "express";
import { addMovieToDislikedList, addMovieToLikedList, addMovieToSavedList, getUserByEmail, removeMovieToSavedList } from "../controller/userController.js";

const userRoute = express.Router()

userRoute.post('/add/like', addMovieToLikedList)
userRoute.post('/add/dislike', addMovieToDislikedList)

userRoute.post('/save/add', addMovieToSavedList)
userRoute.delete('/save/delete/:email/:movieId', removeMovieToSavedList)

userRoute.patch('/:email', getUserByEmail)

export default userRoute
