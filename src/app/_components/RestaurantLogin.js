import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = ()=> {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();

    const loginHandler = async ()=> {
        if(!email || !password) {
            setError(true);
        } else {
            setError(false);
        }
        console.log(email, password);

        // const data = {}

        let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurant`, {
            method: "POST",
            body: JSON.stringify({email, password, login:true})
        });
        response = await response.json();

        if(response.success) {
            const {result} = response;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard")
        } else {
            alert("Login Failed!")
        }
        
    }
    return(
        <>
        <h4>
        Restaurant Login Component
        </h4>

        <div className="input-wrapper">
            <input type="text" placeholder="Enter email..." className="input-field" value={email} onChange={e=> setEmail(e.target.value)}/>
            { error && !email && <span className="input_error">Please enter valid email</span>}
        </div>
        <div className="input-wrapper">
            <input type="password" placeholder="Enter password..." className="input-field" value={password} onChange={e=> setPassword(e.target.value)}/>
            { error && !password && <span className="input_error">Please enter valid password</span>}
        </div>
        <div className="input-wrapper">
            <button className="button" onClick={loginHandler}>Login</button>
        </div>
        </>
    )
}
export default RestaurantLogin;