const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    todo:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
},{ timestamps:true })

module.exports = mongoose.model('todo',TodoSchema)