import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    likedMovie: Array,
    dislikedMovie: Array,
    savedMovie: Array
})

const userModel = mongoose.model('user', userSchema)
export default userModel