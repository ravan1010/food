import { useState } from 'react'
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {

    const [login, setlogin] = useState('');
    const [password, setpassword] = useState('');
    const [show, setshow] = useState(false)
    const [error, setError] = useState('');
    const [success, setsuccess] = useState('');
    const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password <= 8){
      return setError('minimun 8 digit require')
    }

    try {

        await api.post("/api/login",{ 
          number : login, 
          password: password
         },
         { withCredentials: true })
         .then((res) => {
            setsuccess(res.data.message)
            if(res.data.message === "Logged in successfully"){
              setTimeout(() => {
                navigate('/')
              }, 100);
            }
         } )
      
    } catch (err) {
       if (err.response) {
          setError(err.response.data.message); // Server error
        } else {
          setError("Network error"); // Network error
        }
    }
   
  };

  return (
    <div>
    <div className="h-screen flex flex-col justify-center items-center ">
            <div className="flex flex-col items-center w-70 h-auto rounded px-5 p-4 shadow-xl/65 shadow-black inset-shadow-sm inset-shadow-indigo-500 "> 
                <h2 className="font-bold text-3xl mt-10"  >Login</h2>
                    <form action="post" className="items-center p-2 pb-0.5" onSubmit={handleSubmit} >
                        <input 
                        type='text'
                        name='login'
                        placeholder='name'
                        autoComplete='on'
                        minLength={2}
                        maxLength={25}
                        value={login}
                        onChange={(e) => setlogin(e.target.value)}  
                        required 
                        className="w-full px-3 py-3 border-b-2 outline-none mt-4 h-10"

                        />

                          <div className="relative w-full">

                        <input 
                        type={show ? 'text' : 'password'}
                        name='password'
                        placeholder='password'
                        autoComplete='on'
                        minLength={8}
                        maxLength={30}
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}  
                        required 
                        className="w-full px-3 py-3 border-b-2 outline-none mt-4 h-10"

                        />
                        <button
                          type="button"
                          onClick={() => setshow((prev) => !prev)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                        >
                          {show ? "hide" : "show"}
                        </button>
                      </div>


                        { success ? 
                        <p style={{ color: "greenyellow" }} >{success}</p>
                        :
                        <p style={{ color: 'red' }}>{error}</p>
                        }

                        <button type='submit' className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"> login </button>
                        
                    </form>
                    
                        <Link to='/signup' className='text-blue-800 ml-40'>Signup</Link>



                    
            </div> 
    </div>
    </div>
  )
}

export default Login
