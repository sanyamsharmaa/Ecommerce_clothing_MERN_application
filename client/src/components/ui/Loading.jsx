import React from 'react'

function Loading({isloading}) {
   return isloading==true? (
    <div className="absolute top-0 left-0 w-full h-full bg-slate-50 bg-opacity-70 flex justify-center items-center font-extrabold">
        <div>Loading...</div>
        </div>
  ):""
}
export default Loading;