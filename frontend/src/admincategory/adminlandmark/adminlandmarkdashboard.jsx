import { useState } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../../componets/Footer';

import { ArrowLeft , Calendar, MessageSquare, User, BadgePlus, StickyNote,} from 'lucide-react';
import api from '../../api';

const Adminlandmarkdashboard = () => {

    const [post, setpost] = useState('');
    const [productlist, setproductlist] = useState('');
    // const [authorid, setauthorid] = useState('');


    const fetchImages = async () => {
    const res = await api.get(`/api/admin/dashboard`, {withCredentials: true} );
    setpost(res.data.post);
    setproductlist(res.data.productlist)
    // setauthorid(res.data.author)
  
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/admin/${id}`, {withCredentials: true})
      .then((res) => {
        alert(res.data.message)
         window.location.reload();
      })
      .catch(() => alert('delete failed'))
    } catch (error) {
      
    }
  }


  return (
    <>
    <Link to="/" className='h-10 w-[20%] grid mx-auto underline '>Home</Link>
    <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-black">
                  <BadgePlus size={24} />
                </div>
                <div className="ml-4">
              <Link to='/adminlandmark/productcreate' className='border-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>Create Event</Link>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-black">
                  <StickyNote size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Posts</p>
                  <p className="text-xl font-bold text-black-600">{productlist}</p>
                </div>
              </div>
            </div>
            {/* <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Calendar size={24} />
                </div>
                <div className="ml-4">
                  <Link to={'/admin/setdate'} className='border-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>Set date</Link>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <MessageSquare size={24} />
                </div>
                <div className="ml-4">
                  <Link to={'/booked-list'} className='border-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>bookings</Link>
                </div>
              </div>
            </div> */}
             
             <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <User size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="text-xl font-bold text-green-600">Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/*event posts*/}
  
           <div className='w-full mt-10 p-5 flex-col hidden lg:block md:block' >
          {
           Array.isArray(post) && post.map((item, ids) => (
            <div key={ids} className='border p-2 m-2 flex w-full h-25'>
              <div className='h-full w-[10%]'>
              <img src={item.image[0]}   className='h-full w-full' />
              </div>
              <div className='flex w-[75%]'>
                <div className='flex w-full'>
                  <div className='w-[80%] my-auto flex'>
                      <p className='font-semibold text-2xl mr-3'>{item.name} </p>
                    <div>
                      <p className='line-through' >{item.compareprice}Rs</p>
                      <p>{item.price}Rs </p>
                    </div>
                  </div>
                    <p className='my-auto font-bold'>{item.Eventcategory} </p>
                </div>
              </div>
              <div className='my-auto'>
            <button onClick={() => deleteProduct(item._id)} className='px-8 h-10 border rounded-3xl'>Delete</button>
              </div>
              </div>
           ))
          }   
        </div>

         <div className='w-full mt-2 flex p-5 flex-col lg:hidden md:hidden ' >
          {
           Array.isArray(post) && post.map((item, ids) => (
            <div key={ids} className='border flex w-full h-25 my-2'>
              <div className='w-[25%] h-full'>
                  <img src={item.image[0]}  alt="" className='h-full w-full' />
              </div>
              <div className='w-[60%] flex my-auto' >
                <div>
                  <p>{item.name} </p>
                  <p>{item.price}Rs </p>
                </div>
                  <p className='ml-2'>{item.Eventcategory} </p>

              </div>
            <button onClick={() => deleteProduct(item._id)} className='py-1 px-5 border-2 rounded-3xl h-10 my-auto'>Delete</button>
              </div>

           ))
          }  
        </div>
          <Footer />
          {/* Recent Bookings Table */}
          
        </div>
      </div>
  </>
  )
}

export default Adminlandmarkdashboard
