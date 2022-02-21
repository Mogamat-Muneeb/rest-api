const express = require('express')
const router = express.Router()
const Youtuber = require('../models/youtuber')

router.get('/', async (req, res) => {
   try {
    const youtubers = await Youtuber.find()
    res.json(youtubers)
   } catch (err) {
    res.status(500).json({ message: err.message })
   }
})

router.get('/:id', getYoutuber , (req, res) => {
    res.json(res.youtuber)
})

router.post('/', async (req, res) => {
    const youtuber = await Youtuber({
        name: req.body.name,
        youtubedToChannel:req.body.youtubedToChannel
    })
    try{
        const newYoutuber = await youtuber.save()
        res.status(201).json(newYoutuber)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id',getYoutuber, async (req, res) => {
    if(req.body.name !=null){
        res.youtuber.name =  req.body.name
    }
    if(req.body.youtubedToChannel !=null) {
        res.youtuber.youtubedToChannel = req.body.youtubedToChannel
    }
    try{
        const updatedYoutuber = await res.youtuber.save()
        res.json(updatedYoutuber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id',getYoutuber, async (req, res) => {
    try{
        await res.youtuber.remove()
        res.json({ message:'deleted Youtuber'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}) 


 async function getYoutuber(req, res, next) {
     let youtuber
    try{
        youtuber = await Youtuber.findById(req.params.id)
       if(youtuber == null){
           return res.status(404).json({ message:'cannot find Youtuber' })
       } 
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.youtuber = youtuber
    next()
}
module.exports = router