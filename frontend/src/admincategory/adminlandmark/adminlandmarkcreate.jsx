import { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import api from '../../api';



const Adminlandmark = () => {

    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [price, setprice] = useState('');
    const [image, setimage] = useState('');
    const [compareprice, setcompareprice] = useState('');
    const [error, setError] = useState('');
    const [success, setsuccess] = useState('');
    const navigate = useNavigate();

//pri
   function handlePriceChange(e) {
         const value = e.target.value;
         if (/^\d*$/.test(value)) {
            setprice(value);
        }
    }
//display pri
    function handlecomparepriceChange(e) {
         const value = e.target.value;
         if (/^\d*$/.test(value)) {
            setcompareprice(value);
        }
    }
    //image to convert to base64

    const handleFiles = async (e) => {
        const files = Array.from(e.target.files);
      
        if(files.length > 3){
           alert("You can only upload up to 3 files.");
            e.target.value = ''; // Clear the input
            return;
        }
        const base64List = await Promise.all(
          files.map(file => toBase64(file))
        );
        setimage(base64List);

      };

    const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };


  //submit handler

  const handleSubmit = async (e) => {
    e.preventDefault();
     if(!image){
      return alert('upload image')
    }


    try {

        await api.post("/api/admin/post",{
          name: name,
          description: description,
          price: price,
          compareprice: compareprice,
          image: image,

        },
         { withCredentials: true })
         .then((res) => {
            setsuccess(res.data.message)
            if(res.data.message === "post created"){
              alert("post created")
              setTimeout(() => {
                navigate('/adminlandmark/dashboard')
              }, 200);
            }
  
         })

      
    } catch (err) {
       if (err.response) {
          setError(err.response.data.message); // Server error
        } else {
          setError('network error'); // Network error
        }
    }
   
  };

  return (
    <div>
    <div className="h-screen w-full flex flex-col items-center mt-10">
            <div className="flex flex-col md:w-150 items-center w-full h-auto rounded px-5 p-4 shadow-xl/65 shadow-black inset-shadow-sm inset-shadow-indigo-500 "> 
                <h2 className="font-bold text-3xl mt-10"  >Create Event</h2>
                    <form action="post" className="items-center w-full p-2 pb-0.5" onSubmit={handleSubmit} >
                      
                        <label htmlFor='name'>Name</label>
                        <input 
                        id='name'
                        type='text'
                        name='name'
                        placeholder='name'
                        autoComplete='on'
                        value={name}
                        onChange={(e) => setname(e.target.value)}  
                        required 
                        className="w-full px-3 py-3 border-2 mt-0 h-10"

                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                        id='description'
                        name='description'
                        placeholder='description'
                        maxLength={200}
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}  
                        required 
                        className="w-full px-3 py-3 border-2 mt-0 h-30"

                        />

                        

                        <div className='border-2 p-5 mt-2' >

                        <label htmlFor="price">Price</label>
                        <input 
                        id='price'
                        type='text'
                        name='price'
                        placeholder='price'
                        autoComplete='on'
                        value={price}
                        onChange={handlePriceChange}  
                        required 
                        className="w-full px-3 py-3 border-2 mt-0 h-10"

                        />

                        <label htmlFor="compareprice">compareprice</label>
                        <input 
                        id='compareprice'
                        type='text'
                        name='compareprice'
                        placeholder='compareprice'
                        autoComplete='on'
                        value={compareprice}
                        onChange={handlecomparepriceChange}  
                        required
                        
                        className="w-full px-3 py-3 border-2 mt-0 h-10"

                        />

                    </div>

                    <div className='px-4 border-t-8 border-r-2 border-l-2 mt-2 p-2'>
                      <h1 className='font-bold text-3xl'>Upload image</h1>
                      <div  className="w-fit px-9 rounded-3xl py-1.5 border-1 mt-2 h-10">             
                      <label htmlFor='image' required>Image</label>

                        <input 
                        type="file" 
                        multiple 
                        onChange={handleFiles} 
                        id='image'
                        name='image'
                        style={{display:'none'}}
                        
                        />
                        </div>
                        </div>
                        
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: "greenyellow" }}>{ success }</p>}


                        <button type='submit' className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"> Create post </button>
                    </form>
                    
            </div> 
    </div>
    </div>
  )
}

export default Adminlandmark
