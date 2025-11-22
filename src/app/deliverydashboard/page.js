"use client"

import { useRouter } from "next/navigation";
import DeliveryHeader from "../DeliveryHeader";
import { useEffect, useState } from "react";

const Page = ()=> {
    const [myOrders, setMyOrders] = useState([]);
    
    useEffect(()=> {
        getMyOrder()
    }, [])
    
    const getMyOrder = async ()=> {
            const deliveryStorage = JSON.parse(localStorage.getItem("deliveryPartner"));
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deliverypartners/orders/${deliveryStorage._id}`);
            response  = await response.json();
            
            if(response.success) {
                setMyOrders(response.result);
            }        
        }

    const router = useRouter();

    useEffect(()=> {
            const deliveryData = JSON.parse(localStorage.getItem("deliveryPartner"));
            if(!deliveryData) {
                router.push("/deliverypartner");
            }
        }, []);

    return(
        <div>
            <DeliveryHeader />
            <h1>My Order List</h1>
            
            {
                myOrders.map((item)=> (
                    <div className="restaurant_wrapper">
                        <h4>Restaurant: {item.data.name}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data.address}</div>
                        <div>Status: {item.status}</div>
                        <div>Update Status: 
                            <select>
                                <option>Confirmed</option>
                                <option>On the way</option>
                                <option>Delivered</option>
                                <option>Failed to deliver</option>
                            </select>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default Page;