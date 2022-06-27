import userModel from '../models/userModel.js'

export const addMovieToLikedList = async (req, res) => {
    try {
        const { email, movie } = req.body
        const existUser = await userModel.findOne({ email })
        let msg = ''

        if(existUser) {
            const { likedMovie, dislikedMovie } = existUser
            const  isIndexMovieLiked = likedMovie.findIndex(({id}) => id === movie.id)
            const isIndexMovieDisliked = dislikedMovie.findIndex(({id}) => id === movie.id)
            
            if(isIndexMovieLiked === -1 && isIndexMovieDisliked === -1) {
                await userModel.findByIdAndUpdate(existUser._id, {
                    likedMovie: [...existUser.likedMovie, movie],
                    }, 
                    { new: true })
                msg = 'Movie added successfully to like list!'

            } else if (isIndexMovieLiked === -1 && isIndexMovieDisliked !== -1) {
                dislikedMovie.splice(isIndexMovieDisliked, 1)
                await userModel.findByIdAndUpdate(existUser._id, {
                    dislikedMovie,
                    likedMovie: [...existUser.likedMovie, movie]
                }, { new: true })
                msg = 'Movie added successfully to like list and remove from dislike list!'

            } else if (isIndexMovieLiked !== -1) {
                likedMovie.splice(isIndexMovieLiked, 1)
                await userModel.findByIdAndUpdate(existUser._id, {
                    likedMovie
                    }, 
                    { new: true })
                msg = 'Movie remove successfully to like list!'
            }
        } else {
            await userModel.create({ email, likedMovie: [movie] }) 
            msg = 'Movie added successfully to like list!'
        }
        return res.status(200).json({ msg })
    } catch (error) {
        return res.status(406).json({ msg: error.message})
    }
}

export const addMovieToDislikedList = async (req, res) => {
    try {
        const { email, movie } = req.body
        const existUser = await userModel.findOne({ email })
        let msg = ''

        if(existUser) {
            const { likedMovie, dislikedMovie } = existUser
            const  isIndexMovieLiked = likedMovie.findIndex(({id}) => id === movie.id)
            const isIndexMovieDisliked = dislikedMovie.findIndex(({id}) => id === movie.id)

            if(isIndexMovieDisliked === -1 && isIndexMovieLiked === -1) {
                await userModel.findByIdAndUpdate(existUser._id, {
                    dislikedMovie: [...existUser.dislikedMovie, movie],
                    }, 
                    { new: true })
                msg = 'Movie added successfully to dislike list!'

            } else if (isIndexMovieDisliked === -1 && isIndexMovieLiked !== -1) {
                likedMovie.splice(isIndexMovieLiked, 1)
                await userModel.findByIdAndUpdate(existUser._id, {
                    likedMovie,
                    dislikedMovie: [...existUser.dislikedMovie, movie]
                }, { new: true })
                msg = 'Movie added successfully to dislike list and remove from like list!'

            } else if(isIndexMovieDisliked !== -1) {
                dislikedMovie.splice(isIndexMovieDisliked, 1)
                await userModel.findByIdAndUpdate(existUser._id, {
                    dislikedMovie
                    }, 
                    { new: true })
                msg = 'Movie remove successfully to dislike list!'
            }
        } else {
            await userModel.create({ email, dislikedMovie: [movie] })
            msg = 'Movie added successfully to dislike list!'
        }
        return res.status(200).json({ msg })
    } catch (error) {
        return res.status(406).json({ msg: error.message})
    }
}


export const addMovieToSavedList = async (req, res) => {
    try {
        const { email, movie } = req.body
        const existUser = await userModel.findOne({ email })
        if(existUser) {
            const { savedMovie } = existUser
            const  existMovieSavedList = savedMovie.find(({id}) => id === movie.id)
            if(!existMovieSavedList) {
                await userModel.findByIdAndUpdate(existUser._id, {
                    savedMovie: [...existUser.savedMovie, movie]
                    }, 
                    { new: true })
                    return res.status(200).json({ msg: 'Movie added successfully to save list!'})

            } else return res.status(400).json({ msg: 'Movie already has been added to save list!'})

        } else await userModel.create({ email, savedMovie: [movie] })

        return res.status(200).json({ msg: 'Movie added successfully to save list!'})
    } catch (error) {
        return res.status(406).json({ msg: error.message})
    }
}

export const removeMovieToSavedList = async (req, res) => {
    try {
        const { email, movieId } = req.params
        const existUser = await userModel.findOne({ email })
        if(existUser) {
            const { savedMovie } = existUser
            const  movieIndex = savedMovie.findIndex(({id}) => id === Number(movieId))
            if(movieIndex !== -1) {
                savedMovie.splice(movieIndex, 1)
                await userModel.findByIdAndUpdate(existUser._id, {
                    savedMovie
                    }, 
                    { new: true })
                return res.status(200).json({ msg: 'Remove successfully!' })

            } else return res.status(400).json({ msg: 'Movie already hasn\'t been added to save list!'})

        } else return res.status(400).json({ msg: 'No user!'})

    } catch (error) {
        return res.status(406).json({ msg: error.message})
    }
}


export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params
        const existUser = await userModel.findOne({ email })
        if(existUser) {
            return res.status(200).json({ data: existUser, response: true })
        } else res.status(400).json({ msg: 'Can\'t find user!'})
    } catch (error) {
        return res.status(406).json({ msg: error.message })
    }
}




