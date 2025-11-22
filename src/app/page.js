"use client"
import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setlocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationsList, setShowLocationsList] = useState(false);
  const router = useRouter();
  useEffect(()=> {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async ()=> {
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/locations`);
    response = await response.json();
    if(response.success) {
      setlocations(response.result);
    }
  }

  const loadRestaurants = async (params)=> {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer`;
    if(params?.location) {
      // console.log("location");
      url = `${url}?location=${params.location}`;
      // url = url+"?location="+params.location;
    } else if(params?.restaurant) {
      url = `${url}?restaurant=${params.restaurant}`;
    }
    let response = await fetch(url);
    response = await response.json();
    if(response.success) {
      setRestaurants(response.result);
    }
  }

  // console.log(locations);
  // console.log(restaurants);

  const listItemHandler = (item)=> {
    setSelectedLocation(item);
    setShowLocationsList(false)
    loadRestaurants({location: item})
  }
  
  return (
    <main>
      <CustomerHeader />
      <div className="main_page_banner">
        <h1>Food Delivery App</h1>
        <div className="input_wrqapper">
          <input type="text" value={selectedLocation} onClick={()=> setShowLocationsList(true)} className="select_input" placeholder="Select place" />
          <ul className="location_list">
            {
              showLocationsList && locations.map((item)=> (
                <li onClick={()=>listItemHandler(item)}>{item}</li>
              ))
            }
          </ul>
          <input type="text" className="search_input" onChange={(event)=> loadRestaurants({restaurant: event.target.value})} placeholder="Enter food or restaurant name" />
        </div>
      </div>

      <div className="restaurant_list_container">
        {
          restaurants.map((item)=> (
            <div onClick={()=> {router.push(`explore/${item.name}?id=${item._id}`)}} className="restaurant_wrapper">
              <div className="heading_wrapper">
                <h3>{item.name}</h3>
                <h5>Contact: {item.contact}</h5>
              </div>
              <div className="address_wrapper">
                <div>{item.city},</div>
                <div className="address">{item.address}, Email: {item.email}</div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}
