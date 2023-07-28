const mongoose = require('mongoose');

//----------- This is a review schema---------------//
const reviewSchema = mongoose.Schema({
    content : {
        type : 'String',
        require : true
    },
    reviewer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    reviewed : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},
{
    timestamps: true,
}
);

const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review;