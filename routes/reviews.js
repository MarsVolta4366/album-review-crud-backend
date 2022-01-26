const router = require("express").Router()
let Review = require("../models/review.model")

router.route("/").get((req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res) => {
    const author = req.body.author
    const stars = Number(req.body.stars)
    const content = req.body.content
    const album = req.body.album

    const newReview = new Review({
        author, 
        stars,
        content,
        album
    })

    newReview.save()
        .then(() => res.json("Review added!"))
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router