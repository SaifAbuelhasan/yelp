const db = require('./index.js')

const getAll = 'SELECT * FROM restaurant'
const join = ' LEFT JOIN (SELECT restaurant_id, TRUNC(AVG(rating), 1) AS average_rating, COUNT(review) FROM review GROUP BY restaurant_id) review ON restaurant.id = review.restaurant_id'
const getOne = ' WHERE id = $1'
const getReviews = 'SELECT * FROM review WHERE restaurant_id = $1'
// added returning * to return the restaurant from the query
const deleteOne = 'DELETE FROM restaurant WHERE id = $1 returning *'
const addOne = 'INSERT INTO restaurant (id, name, location, price_range) VALUES (gen_random_uuid(), $1, $2, $3) returning *'
const addReview = 'INSERT INTO review (id, restaurant_id, name, content, rating) VALUES (gen_random_uuid(), $1, $2, $3, $4) returning *'
const updateOne = 'UPDATE restaurant SET name = $2, location = $3, price_range = $4 WHERE id = $1 returning *'

class RestaurantDAO {
    // get all
    static async getRestaurants() {
        const restaurantList = (await db.query(getAll + join)).rows
        console.log(restaurantList)
        return restaurantList
    }

    // get specific restaurant
    static async getRestaurantById(id) {
        const result = (await db.query(getAll + join + getOne, [id]))
        const reviews = (await db.query(getReviews, [id])).rows
        const restaurant = result.rows[0]
        console.log(restaurant)
        // if there's no result then the id doesn't exist
        if (!result.rowCount) {
            throw "ID doesn't exist"
        }
        return {restaurant, reviews}
    }

    // create a restaurant
    static async addRestaurant(name, location, price_range) {
        const restaurant = (await db.query(addOne, [name, location, price_range])).rows[0]
        return restaurant
    }

    // update a restaurant
    static async updateRestaurant(id, name, location, price_range) {
        const result = await db.query(updateOne, [id, name, location, price_range])
        const restaurant = result.rows[0]
        // if there's no result then the id doesn't exist
        if (!result.rowCount) {
            throw "ID doesn't exist"
        }
        return restaurant
    }

    // delete a restaurant
    static async deleteRestaurant(id) {
        const result = await db.query(deleteOne, [id])
        const restaurant = result.rows[0]
        // if there's no result then the id doesn't exist
        if (!result.rowCount) {
            throw "ID doesn't exist"
        }
        return restaurant
    }

    // create a review
    static async addReview(restaurant_id, name, content, rating) {
        const reviews = (await db.query(addReview, [restaurant_id, name, content, rating])).rows[0]
        return reviews
    }
}

module.exports = RestaurantDAO