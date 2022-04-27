import http from './RestaurantIndex'

export function getAll() {
    return http.get('/')
}

export function getById(id) {
    return http.get(`/${id}`)
}

export function postRestaurant(name, location, priceRange) {
    return http.post('/', {
        name,
        location,
        price_range: priceRange
    })
}

export function postReview(restaurantId, name, content, rating) {
    console.log({
        restaurantId, name, content, rating
    })
    return http.post(`/${restaurantId}/add-review`, {
        name,
        content,
        rating
    })
}

export function putRestaurant(id, name, location, priceRange) {
    return http.put(`/${id}`, {
        id,
        name,
        location,
        price_range: priceRange
    })
}

export function deleteRestaurant(id) {
    return http.delete(`/${id}`)
}