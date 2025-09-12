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

    return(
        <div className="header-wrapper">
            <div>
                <img style={{width:100}} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"/>
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {
                    details && setDetails?
                    <>
                        <li>
                            <Link href="/">Profile</Link>
                        </li>
                    <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>

                    </>:
                                    <li>
                    <Link href="/">Login/Signup</Link>
                </li>


                }
            </ul>
        </div>
    )
}

export default RestaurantHeader;