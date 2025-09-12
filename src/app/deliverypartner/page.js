"use client"

import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = ()=> {
    const[loginContact, setLoginContact] = useState('');
    const[loginPassword, setLoginPassword] = useState('');
    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const router = useRouter();

    useEffect(()=> {
        const deliveryData = JSON.parse(localStorage.getItem("deliveryPartner"));
        if(deliveryData) {
            router.push("/deliverydashboard");
        }
    }, []);

    const signUpHandler = async ()=> {
        // console.log(name, contact,password,confirmPassword,city,address);
        let response = await fetch('http://localhost:3000/api/deliverypartners/signup', {
            method: 'post',
            body: JSON.stringify({name,contact,password,city,address})
        });

        response = await response.json();
        if(response.success) {
            // alert("User sign up done");
            const {result} = response;
            delete result.password;
            localStorage.setItem("deliveryPartner", JSON.stringify(result));
            // alert("signup successful!")
            router.push("/deliverydashboard")
        } else {
            alert("failed");
        }   
    }

    const loginHandler = async ()=> {
        let response = await fetch('http://localhost:3000/api/deliverypartners/login', {
            method: 'post',
            body: JSON.stringify({loginContact,loginPassword})
        });

        response = await response.json();
        if(response.success) {
            // alert("User sign up done");
            const {result} = response;
            delete result.password;
            localStorage.setItem("deliveryPartner", JSON.stringify(result));
            // alert("success!");
            router.push("/deliverydashboard")
        } else {
            alert("Failed to login, please try again with valid credentials.");
        }
        
    }

    return(
        <div>
            <DeliveryHeader />
            <h1>Delivery Partner</h1>
            <div className="auth-container">
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <div className="input-wrapper">
                <input type="text" placeholder="Enter registered contact number" value={loginContact} onChange={(event)=> setLoginContact(event.target.value)} className="input-field" />
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder="Enter password" value={loginPassword} onChange={(event)=> setLoginPassword(event.target.value)} className="input-field" />
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandler} className="button">Login</button>
            </div>
                </div>


                <div className="signup-wrapper">
                    <h3>Signup</h3>
                    <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter name" onChange={(e)=> setName(e.target.value)} value={name} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter contact number" onChange={(e)=> setContact(e.target.value)} value={contact} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter password" onChange={(e)=> setPassword(e.target.value)} value={password} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Confirm password" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter city" onChange={(e)=> setCity(e.target.value)} value={city} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter address" onChange={(e)=> setAddress(e.target.value)} value={address} />
            </div>
            <div className="input-wrapper">
                <button onClick={signUpHandler} className="button">Sign up</button>
            </div>
                </div>
            </div>
        </div>
    )
}

export default Page;