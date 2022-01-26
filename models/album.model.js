const mongoose = require("mongoose")
const Review = require("./review.model")

const albumSchema = new mongoose.Schema({
    name: {type: String, required: true},
    artist: {type: String, required: true},
    releaseYear: Number
}, {toJSON: {virtuals: true}})

albumSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "album"
})

albumSchema.post("findOneAndDelete", function() {
    Review.deleteMany({album: this._conditions._id})
        .then(deleteStatus => {
            console.log("Delete Status: " + deleteStatus)
        })
})

module.exports = mongoose.model("Album", albumSchema)