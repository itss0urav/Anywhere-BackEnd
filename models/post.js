const mongoose = require('mongoose')

//Post schema

const postModel = new mongoose.Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    upVotes:{
        type:Number,
        default:0
    },
    downVotes:{
        type:Number,
        default:0
    },
    comments:[{
        type:[mongoose.Types.ObjectId],
        ref:"Comment"
    }]
  
},{timestamps:true})


module.exports = mongoose.model("Post", postModel)