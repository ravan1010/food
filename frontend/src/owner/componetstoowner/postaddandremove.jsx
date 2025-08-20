import React, { useEffect, useState } from 'react'
import Navbar from './navbertoowner' 
import OwnerAuth from '../authandroute/auth'
import api from '../../api'


export const Postaddandremove = () => {
    const {owner} = OwnerAuth()

    const [post, setpost] = useState([])

    const postfetch = async() => {
        try {
            await api.get(`/api/owner/getpostdata`,
                 {withCredentials: true})
                 .then((res) => setpost(res.data))
                 .catch((err) => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        postfetch()
    },[])

    const AddTohome = async(id) => {
        try {
            await api.post(`/api/owner/postTohomepage`,{id},
                 {withCredentials: true})
                 .then((res) => alert(res.data.message))
                 .catch((err) => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }

     const rmoveinhome = async(id) => {
        try {
            await api.post(`/api/owner/removepostinhomepage`,{id},
                 {withCredentials: true})
                 .then((res) => alert(res.data.message))
                 .catch((err) => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
    {owner ? 
    <>
        <Navbar />
        <div className='border'>
             {Array.isArray(post) && post.map((product, id) => (
            <div key={id}  className="border p-5">
                <dir>
                    <img src={product.image[0]} className='w-full h-50 object-fill' />
                </dir>
                <p>Resturant : {product.companyName}</p>
                <p>Name : {product.name}</p>
                <p>Resturant price : {product.price}</p>
                <p>with platform price : {product.platformFee}</p>
                <p>status : {product.status}</p>
                <div>
                    <button type="button" className='border px-4 mx-5 text-white bg-green-700 rounded-2xl my-2' onClick={() => AddTohome(product._id)}>add home</button>
                    <button type="button" className='border px-4 mx-5 text-white bg-red-700 rounded-2xl my-2' onClick={() => rmoveinhome(product._id)}>remove home</button>
                </div>
            </div>
        ))}
        </div>
    </>
    :
    <p>404</p>
    }
    </>
  )
}
