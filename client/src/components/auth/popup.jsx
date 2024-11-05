import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import img from '../../assets/images/loginSignup.png'
import {useNavigate} from "react-router-dom";

export default function Popup({trigger,isAuth,setpopup}) {
  const navigate = useNavigate();

  return (trigger===true) && (isAuth===true) ?(
    <div className='fixed p-10 bg-white w-[800px] h-[570px] left-96 top-24 z-50 rounded-md text-white text-center flex justify-center flex-wrap border-2 border-black'>
        <img src={img} className='w-auto rounded-md' alt="" />
        <button className='absolute top-2 right-2' onClick={()=>setpopup(false)}><RxCrossCircled color='black' size={'30px'}/></button>
        <button className='flex justify-center bg-thm rounded-lg w-28 mt-4 p-2 hover:bg-red' onClick={() => navigate("/auth/login")}>Login/SignUp</button>
    </div>
  ):"";  
}
//  Popup;