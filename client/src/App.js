import { Route, Routes } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantContext";
import Home from './pages/Home'
import RestaurantDetails from './pages/RestaurantDetails'
import UpdateRestaurant from "./pages/UpdateRestaurant";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/restaurants/:id" element={<RestaurantDetails/>}/>
          <Route path="/restaurants/update/:id" element={<UpdateRestaurant/>}/>
        </Routes>
      </div>
    </RestaurantsContextProvider>
    
  );
}

export default App;
