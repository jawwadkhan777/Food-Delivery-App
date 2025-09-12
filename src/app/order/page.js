"use client"

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX_PER } from "../lib/constants";
import { useRouter } from "next/navigation";


const Page = ()=> {

    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")));
    const [total] = useState(()=> cartStorage?.length==1? cartStorage[0].price : cartStorage?.reduce((a,b)=> {
        return a.price+b.price;
    }))
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")));
    // console.log(total);
    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(()=> {
        if(!total) {
            router.push("/");
        }
    }, [total]);
    
    const orderPlaceHandler = async() => {
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        let city = JSON.parse(localStorage.getItem("user")).city;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let resto_id = cart[0].resto_id;
        let foodItemIds = cart.map((item)=> item._id).toString();
        let deliveryBoyResponce = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
        deliveryBoyResponce = await deliveryBoyResponce.json();
        let deliveryBodIds = deliveryBoyResponce.result.map((item)=> item._id);
        let deliveryBoy_id = deliveryBodIds[Math.floor(Math.random()*deliveryBodIds.length)]
        if(!deliveryBoy_id) {
            alert('Delivery boy is not availabe');
            return false;
        }        

        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status: "confirm",
            amount: total + (total*TAX_PER/100) + DELIVERY_CHARGES
        }
        // console.log(collection);

        let response = await fetch("http://localhost:3000/api/order", {
            method: 'post',
            body: JSON.stringify(collection)
        });
        response = await response.json();

        if(response.success) {
            alert("Order confirmed, Thanks!");
            setRemoveCartData(true);
            router.push("/profile");
        }
        else
            alert("Oops, Order failed!")
    }

    return(
        <div>
            <CustomerHeader removeCart={removeCartData} />
            
            <div className="total-wrapper">
                <div className="block1">
                    <h2>User Details</h2>
                    <div className="row">
                    <span>Name: </span>
                    <span>{userStorage.name}</span>
                </div>
                    <div className="row">
                    <span>Address: </span>
                    <span>{userStorage.address}</span>
                </div>
                    <div className="row">
                    <span>Contact: </span>
                    <span>{userStorage.contact}</span>
                </div>
                <h2>Amount Details</h2>
                <div className="row">
                    <span>Food Charges: </span>
                    <span>{total}</span>
                </div>
                <div className="row">
                    <span>Tax Charges: </span>
                    <span>{total*TAX_PER/100}</span>
                </div>
                <div className="row">
                    <span>Delivery Charges: </span>
                    <span>{DELIVERY_CHARGES}</span>
                </div>
                <div className="row">
                    <span>Total Amount: </span>
                    <span>{total + (total*TAX_PER/100) + DELIVERY_CHARGES}</span>
                </div>
                <h2>Payment Methods</h2>
                <div className="row">
                    <span>Cash on Delivery: </span>
                    <span>{total + (total*TAX_PER/100) + DELIVERY_CHARGES}</span>
                </div>
                </div>
                <div className="block2">
                    <button onClick={orderPlaceHandler}>Place your Order</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Page;