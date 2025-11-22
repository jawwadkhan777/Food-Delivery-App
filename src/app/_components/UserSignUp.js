import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";


const UserSignUp = (props)=> {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const router = useRouter()

    const signUpHandler = async ()=> {
        // console.log(name,email,password,confirmPassword,city,address,contact);
        let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            method: 'post',
            body: JSON.stringify({name,email,password,city,address,contact})
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
            alert("failed");
        }
        
    }

    return(
        <div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter name" onChange={(e)=> setName(e.target.value)} value={name} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)} value={email} />
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
                <input type="text" className="input-field" placeholder="Enter contact number" onChange={(e)=> setContact(e.target.value)} value={contact} />
            </div>
            <div className="input-wrapper">
                <button onClick={signUpHandler} className="button">Sign up</button>
            </div>
        </div>
    )
}

export default UserSignUp;