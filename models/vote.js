const mongoose = require('mongoose')

//Post schema

const voteModel = new mongoose.Schema({

    userId:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    vote:{
        type:number
    },
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    }
   
  
},{timestamps:true})


module.exports = mongoose.model("Vote", voteModel)