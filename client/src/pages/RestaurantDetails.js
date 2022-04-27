import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantContext";
import StarRating from '../components/StarRating'
import Reviews from "../components/Reviews"
import AddReview from "../components/AddReview";
import {getById} from '../api/RestaurantAPI'


const RestaurantDetails = () => {
    const { id } = useParams()
    const { restaurants, selectedRestaurant, setSelectedRestaurant, findRestaurant } = useContext(
      RestaurantsContext
    )

    
    useEffect(async () => {
      try {
        const restaurant = await getById(id)
        setSelectedRestaurant(restaurant.data)
      } catch (err) {
        console.log(err)
      }
    }, [])


    return (
      <div>
        {selectedRestaurant && (
          <div>
            <h1 className="text-center display-1">
              {selectedRestaurant.restaurant.name}
            </h1>
            <div className="text-center">
              {
                selectedRestaurant.restaurant.average_rating &&
                <StarRating rating={selectedRestaurant.restaurant.average_rating} />
              }
              <span className="text-warning ml-1">
                {selectedRestaurant.restaurant.count
                  ? `(${selectedRestaurant.restaurant.count})`
                  : "(0)"}
              </span>
            </div>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
          </div>
        )}
        <AddReview />
      </div>
    );
  }
  
  export default RestaurantDetails;
  