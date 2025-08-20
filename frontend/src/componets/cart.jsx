import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar"
import Footer from "./Footer"

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);


  const getcart = async() => {
    try {
      setLoading(true)
      await api.get("/api/cart/get", { withCredentials: true })
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
      setLoading(false)
    } catch (error) {
        console.error(error.response.data);
    }
  }

  useEffect(() => {
      getcart()
  }, []);

   const remove = async (id) => {
    try {
      const res = await api.delete(`/api/remove/${id}`, { withCredentials: true });
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error(error.response.data);
    }
  };
 
  return (
    <>
    <Navbar />
      <div className="mb-2 md:mb-3 lg:mb-3 ">
      {loading && <p className='text-3xl mb-90 font-bold '>Loading...</p>}
      {!loading && cart?.items?.length === 0 ? <p className='text-2xl md:w-[40%] mb-90 mx-0 font-bold'>product not found</p> : <> 
  <h1 className="text-3xl font-bold text-gray-800 my-2">Cart</h1>
    <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-auto mb-2">
  {cart?.items?.map((item, id) => (
      <div key={id} className="overflow-hidden px-1.5 md:my-3 lg:my-3 my-1 flex border-2 mx-1 ">
        <div className="w-[55%] h-fit py-1">
         <img src={item.productId?.image[0]} className="md:h-50 h-40 w-full object-fill" />
        </div>
        <div className="w-[30%] mx-auto my-auto h-auto">
          <p className="font-bold text-2xl">{item.productId?.name} </p>
          <p className="font-bold"> Quantity: {item.quantity} <br />₹{item.price}</p>
          <button onClick={() => remove(item._id)} className='border-2 mx-1 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>Remove</button>
        </div>
      </div>            
  ))}
  </div>
    <Link to='/checkout' className="border font-bold rounded-2xl px-3 py-1 grid text-center w-[80%] mx-auto md:w-50 md:mx-5 lg:w-50 lg:mx-8">CheckOut</Link>
</>
}

    </div>
<Footer />
</>
  );
}
