import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { filterOptions } from "@/config";
import { IoSearch } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import logo from "../../assets/logo.png"


function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currItem, setcurrItem] = useState('home');

  function handleNavigate(getCurrentMenuItem) {
    setcurrItem(getCurrentMenuItem.id)
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
        ? {
          category: [getCurrentMenuItem.id],
        }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      )
      : navigate(getCurrentMenuItem.path);
  }
  
  function handleNavigateWithFilter(menuItem, option) {
    // Step 1: Clear any existing filters
    sessionStorage.removeItem("filters");
    // Step 2: Set the category filter based on menuItem
    const currentFilter =
      menuItem.id !== "home" &&
        menuItem.id !== "products" &&
        menuItem.id !== "search"
        ? {
          category: [menuItem.id],
        }
        : null;

    // Step 3: Store the initial category filter in sessionStorage
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    // Step 4: Apply the brand filter directly
    const brandFilter = { brand: [option.id] };
    sessionStorage.setItem("filters", JSON.stringify({ ...currentFilter, ...brandFilter }));

    // Step 5: Perform navigation based on the path and set search parameters if needed
    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?brand=${option.id}`));
    } else {
      navigate(menuItem.path);
    }
  }

  const handleMouseEnter = (key) => {
    setHoveredItem((key.target.innerText.toLowerCase()));
    // console.log("Enter in -",key.target.innerText)
  };


  return (

    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onMouseEnter={(key) => { handleMouseEnter(key) }}
          onMouseLeave={() => setHoveredItem(null)}
          className="relative"
        >

          {/* {console.log("cond -",hoveredItem,menuItem.id,(hoveredItem===menuItem.id))} */}

          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer group"// hover:border-b-2 hover:border-thm
          >
          <span className={`absolute bottom-0 ${currItem==menuItem.id?'w-full left-0':'w-0 left-1/2'} h-[3px] bg-thm transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full transform rounded-md`}></span> 
          {menuItem.label === 'Search' ? <IoSearch size={"20px"} /> : menuItem.label}
          </Label>

          {(hoveredItem == menuItem.id) && (hoveredItem !== 'home') && (hoveredItem !== 'search') && (
            <div className="absolute top-full w-28 border-thm text-center left-[-30px] mt-2 p-2 bg-white shadow-lg border rounded">
              <div className="font-semibold mt-2 mb-2">Category</div>
              {filterOptions.brand.map((option) => (
                <div key={option.id} onClick={() => handleNavigateWithFilter(menuItem, option)} className="cursor-pointer hover:bg-gray-200 p-1">
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>

    // <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    //   {shoppingViewHeaderMenuItems.map((menuItem) => (
    //     <Label
    //       onClick={() => handleNavigate(menuItem)}
    //       className="text-sm font-medium cursor-pointer"
    //       key={menuItem.id}
    //     >
    //       {menuItem.label}
    //     </Label>
    //   ))}
    // </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "sangam");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <div className="flex item-center justify-center"><img src={logo} className="w-30 h-14" alt="" /></div>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            {/* <HeaderRightContent /> */}
            {!isAuthenticated && <Button className="mr-2 " onClick={() => navigate("/auth/login")}>Log in</Button> }
            {isAuthenticated && <HeaderRightContent />}
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          {/* <HeaderRightContent /> */}
          {!isAuthenticated &&
            <Button className="mr-2 p-0 flex flex-col text-xs text-black bg-white hover:bg-white lgn" onClick={() => navigate("/auth/login")}>
              <BsFillPersonFill size={'50px'} />
              LogIn/SignUp
            <span className="absolute bottom-0 left-1/2 z-20 w-0 h-[3px] bg-thm transition-all duration-300 ease-out lgn-hover:left-0 lgn-hover:w-full transform rounded-md"></span> 
            </Button>}

          {isAuthenticated && <HeaderRightContent />}
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
