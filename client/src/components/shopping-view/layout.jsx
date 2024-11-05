import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import InfiniteScroll from "../ui/autoscrolling";
// import logo from "../../assets/logo.png"
function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <InfiniteScroll/>
      {/* <div className="flex item-center justify-center h-50"><img src={logo} className="w-30 h-20" alt="" /></div> */}
      
      <ShoppingHeader />
      <main className="flex flex-col w-full">

        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
