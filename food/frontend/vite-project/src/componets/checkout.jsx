import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ArrowLeft } from "lucide-react";


export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectaddress, setSelectaddress] = useState([]);
  const [saveAddress, setsaveAddress] = useState()
  const [total, setTotal] = useState(0);
  const [mobileNo, setmobileNo] = useState('')
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();

      // Enable only if time is between 7 AM (07:00) and 3 PM (15:00)
      if (hours >= 7 && hours < 15) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    };

    // Run immediately
    checkTime();

    // Check every minute
    const interval = setInterval(checkTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  function handlemobileNoChange(e) {
         const value = e.target.value;
  // Allow only numbers
         if (/^\d*$/.test(value)) {
            setmobileNo(value);
        }
    }

  useEffect(() => {
    axios.get("http://localhost:5001/api/cart/get", { withCredentials: true })
      .then(res => {
        setCartItems(res.data.items);
        const totalPrice = res.data.items.reduce(
          (sum, item) => sum + (item.price * 1),
          0
        ) + 30;
        if(totalPrice === 30){
          navigate('/cart')
        }else{
        setTotal(totalPrice);
        }
      })
      .catch(err => console.error(err));
  }, []);

 

   const loadOpenDays = async () => {
        try {
          const res = await axios.get(`http://localhost:5001/api/address-list`,
              {withCredentials: true}
          );
            setSelectaddress(res.data.address)
          console.log("address",res.data.address)

        } catch (err) {
          console.error('Error loading open days', err);
        }
      };
  
    useEffect(() => {
      loadOpenDays();
    }, []);

     const options = selectaddress.map(addr => ({
          value: `${addr._id}`,
          label: (
            <div>
              <div><strong>{addr.Fullname}</strong></div>
              <div>{addr.cityTown}, {addr.state} - {addr.pincode}</div>
              <div>{addr.ASSV}, {addr.FHBCA}, {addr.Landmark}</div>
            </div>
          ),
            fullData: addr // 👈 save whole object

  }));

    const handleChange = (selectedOption) => {
        const fullAddress = selectedOption.fullData;
        setsaveAddress(fullAddress);
        console.log('suhas',fullAddress, saveAddress)
    }

const buyNow = async (e) => {
  e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/buy", {
        Mobnumber: mobileNo,
        address: saveAddress,
      }, { withCredentials: true })
      .then((res) => {
          if (res.data.message === "Purchase successful") {
            setSuccessMsg("✅ Order placed successfully!");
            // Optional: redirect after delay
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        }
      )
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="checkout">
      <Link to="/cart" ><ArrowLeft size={30} /></Link>
      <h2 className="font-bold text-2xl mb-2">Checkout</h2>
      
      <form action="post" onSubmit={buyNow}>
      <div className="grid border md:grid-cols-2 md:w-[90%] lg:w-[60%] md:mx-auto md:p-5 p-1">
      <div className="px-3 py-2 border-2 ">
     <label htmlFor='mobileNo' className='text-2xl font-bold my-2 border-b-2 mx-auto'>Contact Number</label>
             <input 
                type= "tel"
                id='mobileNo'
                name='mobileNo'
                placeholder='mobileNo'
                autoComplete='on'
                maxLength={10}
                minLength={10}
                value={mobileNo}
                onChange={handlemobileNoChange}
                required 
                className="w-full px-3 py-3 border-1 block outline-none my-2 h-10"
              />
              <div className="flex">
              <h1 className='font-bold text-2xl mx-2 my-1' >Select Address </h1>
              <button className='border px-5 rounded-3xl my-1.5'>
                <Link to={'/address'}> Add address</Link>
              </button>
              </div>
              <Select options={options} 
                onChange={handleChange}
                required
                className="w-[95%] border-2 my-0.5 mx-auto"
              />
    </div>

      <div className="items border-2 px-2">
        <h1 className="font-bold text-2xl">Amount</h1>
        {cartItems.map(item => (
          <div key={item._id}>
            <p>{item.productId?.name} × {item.quantity}</p>
            <p>₹{item.price * 1}</p>
          </div>
        ))}
        
      <p>Delivery Fee: ₹30</p>
      <h3>Total: ₹{total}</h3>
      </div>


      {/* <textarea
        placeholder="Enter delivery address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      /> */}
        </div>
         <button
      disabled={!isEnabled}
      className={`px-6 py-2 mt-2 rounded text-white ${
        isEnabled ? "bg-blue-600 hover:bg-blue-700 " : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      {isEnabled ? "Buy Now" : "Available 7 AM - 3 PM"}
    </button>
        </form>
        {successMsg && (
        <div className="text-green-600 font-bold text-xl my-3">
          {successMsg}
        </div>
      )}
    </div>
  );
}
