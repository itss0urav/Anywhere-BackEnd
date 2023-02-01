const mongoose = require('mongoose')


const connectDb = async () => {

    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URL)

    } catch (error) {
        console.log(error)
    }

}


module.exports = {connectDb}