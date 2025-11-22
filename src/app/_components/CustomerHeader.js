// "use client"

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const CustomerHeader = ({ cartData, removeCartData, removeCart }) => {
//   const userStorage = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
//   const cartStorage = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
//   const [user, setUser] = useState(userStorage? userStorage:undefined)
//   const [cartCount, setCartCount] = useState(cartStorage?.length);
//   const [cartItem, setCartItem] = useState(cartStorage);

//   const router = useRouter();

//   // console.log(userStorage);
  

//   useEffect(() => {
//     if (cartData) {
//         console.log(cartData);
//       if (cartCount) {
//         if(cartItem[0].resto_id!=cartData.resto_id) {
//           localStorage.removeItem("cart");
//           setCartCount(1);
//           setCartItem([cartData])
//           localStorage.setItem("cart", JSON.stringify([cartData]));

//         } else {
//           let localCartItem = cartItem;
//           localCartItem.push(JSON.parse(JSON.stringify(cartData)));
//           setCartItem(localCartItem);
//           setCartCount(cartCount+1);
//           localStorage.setItem("cart", JSON.stringify(localCartItem));
//         }
//       } else {
//         setCartCount(1);
//         setCartItem([cartData])
//         localStorage.setItem("cart", JSON.stringify([cartData]));
//       }
//     }
//   }, [cartData]);

//   useEffect(()=> {
//     if(removeCartData) {
//       let localCartItem = cartItem.filter((item)=> {
//         return item._id!=removeCartData
//       });
//       setCartItem(localCartItem);
//       setCartCount(cartCount-1);
//       localStorage.setItem('cart', JSON.stringify(localCartItem));
//       if(localCartItem.length==0) {
//         localStorage.removeItem('cart');
//       }
//     }

//   }, [removeCartData]);

//   useEffect(()=> {
//     if(removeCart) {
//       setCartItem([]);
//       setCartCount(0);
//       localStorage.removeItem("cart");
//     }
//   }, [removeCart]);

//   const logoutHandler = ()=> {
//     localStorage.removeItem("user");
//     router.push("/user-auth");
//   }


//   return (
//     <div className="header-wrapper">
//       <div>
//         <img
//           style={{ width: 100 }}
//           src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
//         />
//       </div>

//       <ul>
//         <li>
//           <Link href="/">Home</Link>
//         </li>
//         {
//           user?
//           <>
//             <li>
//               <Link href="/profile">{user.name}</Link>
//             </li>
//             <li>
//               <button onClick={logoutHandler}>Logout</button>
//             </li>
//           </>
//           :
//           <>
//             <li>
//               <Link href="/">Login</Link>
//             </li>
//             <li>
//               <Link href="/user-auth">SignUp</Link>
//             </li>
//           </>
//         }
//         <li>
//           <Link href={cartCount? "/cart": "#"}>Cart({cartCount? cartCount : 0})</Link>
//         </li>
//         <li>
//           <Link href="/restaurant">Add Restaurant</Link>
//         </li>
//         <li>
//           <Link href="/deliverypartner">Delivery Partner</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default CustomerHeader;


"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = ({ cartData, removeCartData, removeCart }) => {
  const [user, setUser] = useState(undefined);
  const [cartItem, setCartItem] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();

  // Load user & cart ONLY on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedCart = localStorage.getItem("cart");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        setCartItem(cart);
        setCartCount(cart.length);
      }
    }
  }, []);

  // Add to cart
  useEffect(() => {
    if (cartData) {
      let updatedCart = [...cartItem];

      if (cartItem.length > 0 && cartItem[0].resto_id !== cartData.resto_id) {
        updatedCart = [cartData];
      } else {
        updatedCart.push(cartData);
      }

      setCartItem(updatedCart);
      setCartCount(updatedCart.length);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [cartData]);

  // Remove single item
  useEffect(() => {
    if (removeCartData) {
      let updatedCart = cartItem.filter((item) => item._id !== removeCartData);

      setCartItem(updatedCart);
      setCartCount(updatedCart.length);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [removeCartData]);

  // Remove entire cart
  useEffect(() => {
    if (removeCart) {
      setCartItem([]);
      setCartCount(0);
      localStorage.removeItem("cart");
    }
  }, [removeCart]);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  return (
    <div className="header-wrapper">
      <div>
        <img
          style={{ width: 100 }}
          src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
        />
      </div>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/profile">{user.name}</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/">Login</Link>
            </li>
            <li>
              <Link href="/user-auth">SignUp</Link>
            </li>
          </>
        )}

        <li>
          <Link href={cartCount ? "/cart" : "#"}>Cart({cartCount})</Link>
        </li>
        <li>
          <Link href="/restaurant">Add Restaurant</Link>
        </li>
        <li>
          <Link href="/deliverypartner">Delivery Partner</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
