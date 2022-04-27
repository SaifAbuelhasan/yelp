import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getAll, getById, deleteRestaurant} from '../api/RestaurantAPI'
import { RestaurantsContext } from "../context/RestaurantContext";
import StarRating from "./StarRating";

const RestaurantList = () => {
  const {restaurants, setRestaurants, removeRestaurant} = useContext(RestaurantsContext)
  const navigate = useNavigate()

  useEffect(async () => {
    try {
      const response = await getAll()
      setRestaurants(response.data)
    } catch (err) {
      console.log("Couldn't fetch  restaurants " + err)
    }
  }, [])
  
  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await deleteRestaurant(id)
      removeRestaurant(id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation()
    navigate(`restaurants/update/${id}`)
  }

  const handleRestaurantSelect = (id) => {
    // console.log(restaurants)
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    return (
      <>
      {
        restaurant.average_rating
        ?
        <StarRating rating={restaurant.average_rating}/>
        :
        'NA'
      }
      </>
    )
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        {restaurants &&
            restaurants.map((restaurant) => {
              return (
                // Since the parent element has an onClick, children's onClick (update and delete) will propagate to the
                // parent's onClick. To fix this we have to call stopPropagation() in each of the children's functions
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* <tr>
                <td>McDonald's</td>
                <td>Queens</td>
                <td>$$</td>
                <td>Rating</td>
                <td>
                    <button className="btn btn-warning">Update</button>
                </td>
                <td>
                    <button className="btn btn-danger">Delete</button>
                </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
