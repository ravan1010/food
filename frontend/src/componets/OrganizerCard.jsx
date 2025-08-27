// src/components/OrganizerCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import axios from "axios";
import { useState } from 'react';
import api from '../api';


const OrganizerCard = ({ organizer }) => {
  const [noti, setnoti] = useState(' ')
  const [quantity, setquantity] = useState(1); // ✅ now setquantity is a real function
    const reversedID = organizer._id.split("").reverse().join(""); // => "tcaer"
    
    const addToCart = async (productId, price, quantity = 1) => {
    try {
      const res = await api.post("/api/cart/add", { productId, quantity, price }, { withCredentials: true });
      console.log(res.data.message);
      if(res.data.message){
        setnoti('Added to cart')
        setTimeout(() => {
        setnoti()
      }, 1000);}
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
      {/* <Link to={`/event?d=${reversedID}`}> */}
        <div className="relative">
          <img className="w-full h-56 object-fill" src={organizer.image} alt={organizer.name} />
          <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {organizer.cityTown}
            </div>
          </div>
          <div className="absolute top-0 left-0 bg-indigo-600 text-white px-3 m-1 rounded-full text-sm font-semibold">
            <div className="flex items-center gap-0">
              {noti}
            </div>
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-xl font-bold text-gray-800 truncate">{organizer.name}</h3>
          <p className="text-gray-500 h-10">{organizer.description}</p>
          <div className='flex w-full'>
            <h1 className='font-bold text-2xl w-[80%] mx-auto'>{organizer.companyName}</h1>
            <div className='w-[20%]'>
              <p className='line-through mx-1.5'>{quantity * organizer.compareprice}Rs</p>
              <p className="text-lg font-semibold text-gray-800 mx-1">{quantity * organizer.platformFee}Rs</p>
            </div>
          </div>
          <div className='flex my-1.5'>
            <div className='w-[50%] mx-auto'>
              <label htmlFor="quantity" >quantity </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setquantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
          </div>

          <button onClick={() => addToCart(organizer._id, quantity * organizer.platformFee ,quantity)} className="border-2 w-[50%] mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">Add to Cart</button>
          </div>
        </div>
      {/* </Link> */}
    </div>
  );
};

export default OrganizerCard;