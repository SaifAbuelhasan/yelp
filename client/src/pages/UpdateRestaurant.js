import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantContext";
import { putRestaurant } from "../api/RestaurantAPI";

const UpdateRestaurant = (props) => {
  const { id } = useParams()
  let navigate = useNavigate()
  const { findRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Trying to reach this url without clicking update button would cause an error as context is being created on rendering the RestaurantList
  // component. Should've probably used redux.   
  useEffect(async () => {
    try {
        const restaurant = findRestaurant(id)
        setName(restaurant.name)
        setLocation(restaurant.location)
        setPriceRange(restaurant.price_range)
    } catch (err) {
        setName("Should have used redux")
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedRestaurant = await putRestaurant(id, name, location, priceRange)
    } catch (err) {
        console.log(err)
    }
    navigate("/");
  };

return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
