"use client"

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX_PER } from "../lib/constants";
import { useRouter } from "next/navigation";


const Page = ()=> {

    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")));

    const [total] = useState(()=> cartStorage.length==1? cartStorage[0].price : cartStorage.reduce((a,b)=> {
        return a.price+b.price;
    }))
    const router = useRouter();
    // console.log(total);
    
    const orderNowHandler = ()=> {
        if(JSON.parse(localStorage.getItem('user')))
            router.push('/order')
        else
            router.push("/user-auth?order=true")
    } 

    return(
        <div>
            <CustomerHeader />
            
            <div className="food-item-wrapper">
                {
                cartStorage.length>0? cartStorage.map((item)=> (
                    <div className="list-item">
                        <div className="list-item-block1">
                            <img style={{width: 100}} src={item.img_path} alt="img..." />
                        </div>
                        <div className="list-item-block2">
                            <div>{item.name}</div>
                        <div className="description">{item.description}</div>
                            <button onClick={()=> removeFromCart(item._id)}>Remove from cart</button>
                        </div>
                        <div className="list-item-block3">Price: {item.price}</div>
                    </div>
                )) :
                <h1>No food item available for now!</h1>
                }
            </div>
            <div className="total-wrapper">
                <div className="block1">
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
                </div>
                <div className="block2">
                    <button onClick={orderNowHandler}>Order Now</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Page;