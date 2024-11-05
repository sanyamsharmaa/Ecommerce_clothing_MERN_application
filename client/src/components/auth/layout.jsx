import { Outlet } from "react-router-dom";
import img from "../../assets/images/auth-frame.png"; 

function AuthLayout() {
  return (

    <div className="flex min-h-screen  w-full " style={{backgroundImage: "url('https://cdn.magicdecor.in/com/2023/10/04160540/Patchwork-Rajastani-Wallpaper-for-Wall-2-710x488.jpg')"}}>
      <div className="hidden lg:flex items-center justify-center  w-1/2  px-12" style={{filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 10))"}}>
        <div className="max-w-md space-y-6 text-center  text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <img src={img} alt="this is image" className="absolute w-450 "/>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
