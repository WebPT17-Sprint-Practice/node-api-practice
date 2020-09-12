const express = require('express');
const showsModel = require('../helpers/showsModel.js');

const router = express.Router();

router.post('/', (req, res) => {
    const showInfo = req.body
    showsModel
    .insert(showInfo)
    .then(() => {
        res.status(201).json(({message: "Your show was created."}))
    })
})

router.get('/', (req, res) => {
    showsModel.get(req.id)
    .then(e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "error"})
    })
})

router.put('/:id', (req, res) => {
    const showInfo = req.body;
    const {id} = req.params;
    showsModel
    .update(id, showInfo)
    .then(e => {
        if(e){
            res.status(200).json({message:"The show has been updated."})
        } else {
            res.status(404).json({message: "The show cannot be found to be updated."})
        }
    })
    .catch(error => {
        res.status(500).json({error: "There was an error updating the show"})
    })
})

router.delete('/:id', (req, res) => {
    showsModel
    .remove(req.params.id)
    .then(e => {
        if(e > 0){
            res.status(200).json({message: "The show has been deleted"})
        } else {
            res.status(404).json({message: "The show can not be found."})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "error deleting the show."})
    })
})

router.get('/:id/characters', (req, res) => {
    showsModel
    .getShowsCharacters(req.params.id)
    .then((e) => {
        res.status(200).json(e) 
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: "error retrieving characters"})
    });
});


module.exports = router