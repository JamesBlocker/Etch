const Etch = require('../models/Etch.js')

module.exports = {
    index: (req, res) => {
        res.render('etches/index')
    },

    show: (req, res) => {
        Etch.findById(req.params.id, (err, thatEtch) => {
            if (err) return console.log(err)
            res.render('etches/show', {etch: thatEtch})
        })
    },

    new: (req, res) => {
        res.render('etches/new')
    },

    create: (req, res) => {
        const newEtch = new Etch(req.body)
        newEtch.user = req.params.userId
        newEtch.save((err, brandNewEtch) => {
            res.json({success: true, message: "New etch created", etch: brandNewEtch})
        })
    },

    edit: (req, res) => {
        Etch.findById(req.params.id, (err, thatEtch) => {
            if (err) return console.log(err)
            res.render('etches/edit', {etch: thatEtch}) 
        })
    },

    destroy: (req, res) => {
        Etch.findByIdAndRemove(req.params.id, (err, deletedEtch) => {
            if (err) return console.log(err)
            res.redirect('users/profile')
        })
    }

}