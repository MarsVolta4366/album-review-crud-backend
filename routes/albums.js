const router = require("express").Router()
let Album = require("../models/album.model")

router.route("/").get((req, res) => {
    Album.find()
        .then(albums => res.json(albums))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res) => {
    const name = req.body.name
    const artist = req.body.artist
    const releaseYear = Number(req.body.releaseYear)

    const newAlbum = new Album({
        name,
        artist,
        releaseYear
    })

    newAlbum.save()
        .then(() => res.json("Album added"))
        .catch(err => res.status(400).json("Error: " + err))
})

// GET ALBUM BY ID
router.route("/:id").get((req, res) => {
    Album.findById(req.params.id)
        .populate({
            path: "reviews"
        })
        .then(album => res.json(album))
        .catch(err => res.status(400).json("Error: " + err))
})

// DELETE ALBUM
router.route("/:id").delete((req, res) => {
    Album.findByIdAndDelete(req.params.id)
        .then(() => res.json("Album deleted"))
        .catch(err => res.status(400).json("Error: " + err))
})

// UPDATE ALBUM
router.route("/:id").put((req, res) => {
    Album.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json("Album updated"))
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router