import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props)=> {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const router = useRouter();

    // console.log("Login", props);

    const loginHandler = async ()=> {
        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'post',
            body: JSON.stringify({email,password})
        });

        response = await response.json();
        if(response.success) {
            // alert("User sign up done");
            const {result} = response;
            delete result.password;
            localStorage.setItem("user", JSON.stringify(result));
            if(props?.redirect?.order) 
                router.push("/order");
            else
                router.push("/");
        } else {
            alert("Failed to login, please try again with valid credentials.");
        }
        
    }
    return(
        <div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter email" value={email} onChange={(event)=> setEmail(event.target.value)} className="input-field" />
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder="Enter password" value={password} onChange={(event)=> setPassword(event.target.value)} className="input-field" />
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandler} className="button">Login</button>
            </div>
        </div>
    )
}

export default UserLogin;