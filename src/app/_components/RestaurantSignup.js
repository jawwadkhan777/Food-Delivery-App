import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [c_password, setC_password] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const router = useRouter();

    const signupHandler = async ()=> {
      if(password !== c_password) {
        setPasswordError(true)
        return false;
      } else {
        setPasswordError(false)
      }

      if(!email || !password || !c_password || !name || !city || !address || !contact) {
        setError(true)
        return false;
      } else {
        setError(false)
      }

        const data = {
            email,
            password,
            c_password,
            name,
            city,
            address,
            contact

        }
        // console.log(data);
        let response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify(data)

        })
        response = await response.json();
        // console.log(response);

        if(response.success) {
          // alert("Restaurant registered successfully!")
          const {result} = response;
          delete result.password;
          localStorage.setItem("restaurantUser", JSON.stringify(result));
          router.push("/restaurant/dashboard")
        }        
        
    }
  return (
    <>
      <h4>Signup</h4>
      <div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter email..."
            className="input-field"
            value={email}
            onChange={(event)=> setEmail(event.target.value)}
          />
          { error && !email && <span className="input_error">Please enter valid email</span> }
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter password..."
            className="input-field"
            value={password}
            onChange={e=> setPassword(e.target.value)}
            />
          { passwordError && <span className="input_error">Password and confirm password not match</span> }
          { error && !password && <span className="input_error">Please enter a strong password</span> }
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm password..."
            className="input-field"
            value={c_password}
            onChange={e=> setC_password(e.target.value)}
            />
            { passwordError && <span className="input_error">Password and confirm password not match</span> }
            { error && !c_password && <span className="input_error">Please enter again password</span> }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter restaurant name..."
            className="input-field"
            value={name}
            onChange={e=> setName(e.target.value)}
            />
            { error && !name && <span className="input_error">Please enter your restaurant name</span> }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter city..."
            className="input-field"
            value={city}
            onChange={e=> setCity(e.target.value)}
            />
            { error && !city && <span className="input_error">Please enter city</span> }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter full address..."
            className="input-field"
            value={address}
            onChange={e=> setAddress(e.target.value)}
            />
            { error && !address && <span className="input_error">Please enter restaurant address</span> }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter contact no...."
            className="input-field"
            value={contact}
            onChange={e=> setContact(e.target.value)}
            />
            { error && !contact && <span className="input_error">Please enter valid contact number</span> }
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={signupHandler}>Sign up</button>
        </div>
      </div>
    </>
  );
};
export default RestaurantSignup;
