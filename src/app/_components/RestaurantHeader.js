'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const RestaurantHeader = () => {

    const [details, setDetails] = useState();

    const route = useRouter();
    const pathName = usePathname();

    useEffect(()=> {
        const data = localStorage.getItem("restaurantUser");
        if(!data && pathName=="/restaurant/dashboard") {
            route.push("/restaurant");
        }
        else if(data && pathName=="/restaurant") {
            route.push("/restaurant/dashboard")
        }
        else {
            setDetails(JSON.parse(data));
        }
    }, [])

    const logoutHandler = ()=> {
        localStorage.removeItem("restaurantUser");
        route.push("/restaurant");
    }

    return (
        <header className="erp-header">
            <div className="erp-brand-container">
                <img 
                    className="erp-logo" 
                    src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" 
                    alt="FoodExpress Partner Logo" 
                />
                <div className="erp-title-block">
                    <span className="erp-title">FoodExpress</span>
                    <span className="erp-badge">Partner Portal</span>
                </div>
            </div>
            <ul className="erp-nav">
                <li>
                    <Link href="/" className={`erp-nav-item ${pathName === "/" ? "active" : ""}`}>
                        Home
                    </Link>
                </li>
                {details ? (
                    <>
                        <li>
                            <Link 
                                href="/restaurant/dashboard" 
                                className={`erp-nav-item ${pathName.startsWith("/restaurant/dashboard") ? "active" : ""}`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="erp-user-profile">
                                <div className="erp-avatar">
                                    {details.name ? details.name.charAt(0).toUpperCase() : "R"}
                                </div>
                                <div className="erp-user-info">
                                    <span className="name">{details.name}</span>
                                    <span className="role">{details.city || "Partner"}</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button className="erp-logout-btn" onClick={logoutHandler}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link 
                            href="/restaurant" 
                            className={`erp-nav-item ${pathName === "/restaurant" ? "active" : ""}`}
                        >
                            Login / Signup
                        </Link>
                    </li>
                )}
            </ul>
        </header>
    );
};

export default RestaurantHeader;