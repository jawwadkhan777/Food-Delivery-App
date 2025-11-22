import { useState } from "react";

const AddFoodItem = ({setAddItem})=> {
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const addFoodItemHandler = async ()=> {
        if(!name || !price || !path || description) {
            setError(true);
            // return false;
        } else {
            setError(false);
        }
        let resto_id;
        let restoData = JSON.parse(localStorage.getItem("restaurantUser"));
        if(restoData) {
            resto_id = restoData._id;
            console.log(resto_id);
            
        }
        const data = {name, price, img_path:path, description, resto_id};
        console.log(data);
        
        let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurant/foods`, {
            method: "POST",
            body: JSON.stringify(data)
        });
        
        response = await response.json();
        if(response.success) {
            alert("Food item added successfully!");
            setAddItem(false);
        }         
        else
            alert("Food item not added!");
    }

    return(
        <div className="container">
            <h1>Add New Food Item</h1>
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
                <button className="button" onClick={addFoodItemHandler}>Submit</button>
            </div>
        </div>
    )
}

export default AddFoodItem;