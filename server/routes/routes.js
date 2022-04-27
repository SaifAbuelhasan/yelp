// This isn't necessary. You can just add the handlers to the app instance.
const restaurantDAO = require('../db/restaurantDAO.js')

const express = require('express')
const router = express.Router()

router.route('/').get(async (req, res) => {
    try {
        const restaurantList = await restaurantDAO.getRestaurants()
        res.json(restaurantList)
    } catch (err) {
        console.log("Database Error: " + err)
        res.status(404).json({error: err})
    }
})

router.route('/:id').get(async (req, res) => {
    const id = req.params.id
    try {
        const restaurant = await restaurantDAO.getRestaurantById(id)
        res.json(restaurant)
    } catch (err) {
        console.log("Database Error: " + err)
        res.status(404).json({error: err})
    }
})

router.route('/').post(async (req, res) => {
    const {name, location, price_range} = req.body
    try {
        const restaurant = await restaurantDAO.addRestaurant(name, location, price_range)
        res.json(restaurant)
    } catch (err) {
        console.log("Database Error: " + err)
        res.status(404).json({error: err})
    }
})

router.route('/:id').put(async (req, res) => {
    const id = req.params.id
    const {name, location, price_range} = req.body
    try {
        const restaurant = await restaurantDAO.updateRestaurant(id, name, location, price_range)
        res.json(restaurant)
    } catch (err) {
        console.log("Database Error: " + err)
        res.status(404).json({error: err})
    }
})

router.route('/:id').delete(async (req, res) => {
    const id = req.params.id
    try {
        const restaurant = await restaurantDAO.deleteRestaurant(id)
        res.json(restaurant)
    } catch (err) {
        console.log("Database Error: " + err)
        res.status(404).json({error: err})
    }
})

router.route('/:id/add-review').post(async (req, res) => {
    const restaurant_id = req.params.id
    const {name, content, rating} = req.body
    try {
        const reviews = await restaurantDAO.addReview(restaurant_id, name, content, rating)
        res.json(reviews)
    } catch (err) {
        console.log("Database Error: " + err)
        res.status(404).json({error: err})
    }
})

module.exports = router