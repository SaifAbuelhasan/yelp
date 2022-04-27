import { useContext, useState } from "react";
import {postRestaurant} from '../api/RestaurantAPI'
import { RestaurantsContext } from "../context/RestaurantContext";
const AddRestaurant = () => {
    const {addRestaurant} = useContext(RestaurantsContext)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')

    const clearData = () => {
        setLocation('')
        setName('')
        setPriceRange('Price Range')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await postRestaurant(name, location, priceRange)
            clearData()
            addRestaurant(response.data)
        } catch (err) {
            console.log("Error posting " + err)
        }
    }

    return (
        <div className="mb-4">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="location"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <select className="form-select my-1 mr-sm-2" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
  
export default AddRestaurant;
  