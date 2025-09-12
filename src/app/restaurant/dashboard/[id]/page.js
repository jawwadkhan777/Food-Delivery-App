"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItem = (props)=> {
    // console.log(props.params.id);
    const router = useRouter();
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    
    useEffect(()=> {
        loadFoodItemHandler();
    }, []);

    const loadFoodItemHandler = async ()=> {
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`); 
        response = await response.json();

        if(response.success) {
            console.log(response.result);
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description);
            
        }
    }

    const editFoodItemHandler = async ()=> {
        if(!name || !price || !path || description) {
            setError(true);
            // return false;
        } else {
            setError(false);
        }
        console.log(name, price, path, description);
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`, {
            method: "PUT",
            body: JSON.stringify({name, price, img_path: path, description})
        });
        response = await response.json();
        if(response.success) {
            router.push(`../dashboard`)
        } else{
            alert("Food item not updated successfully, please try again!")
            
        }
        
    }

    return(
        <div className="container">
            <h1>Edit Food Item</h1>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter food name" className="input-field" value={name} onChange={e=> setName(e.target.value)} />
                { error && !name && <span className="input_error">Please enter valid name</span>}
            </div>
            <div className="input-wrapper">
                <input type="number" placeholder="Enter price" className="input-field" value={price} onChange={e=> setPrice(e.target.value)} />
                { error && !price && <span className="input_error">Please enter price</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter image path" className="input-field" value={path} onChange={e=> setPath(e.target.value)} />
                { error && !path && <span className="input_error">Please enter image path</span>}
            </div>
            <div className="input-wrapper"> 
                <input type="text" placeholder="Enter description" className="input-field" value={description} onChange={e=> setDescription(e.target.value)} />
                { error && !description && <span className="input_error">Please enter description</span>}
            </div>

            <div className="input-wrapper">
                <button className="button" onClick={editFoodItemHandler}>Update</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={()=> router.push(`../dashboard`)}>Back</button>
            </div>
        </div>
    )
}

export default EditFoodItem;