import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const findRestaurant = (id) => {
    const restaurant = restaurants.find((restaurant) => restaurant.id === id)
    return restaurant
  }

  const removeRestaurant = (id) => {
    setRestaurants(restaurants.filter((restaurant) => {
      return restaurant.id !== id
    }))
  }
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        addRestaurant,
        removeRestaurant,
        findRestaurant
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};