// import { Button } from "@/components/ui/button";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CloudLightning,
//   Shirt,
//   ShirtIcon,
//   Airplay,
//   BabyIcon,
//   Heater,
//   Images,
//   ShoppingBasket,
//   UmbrellaIcon,
//   WashingMachine,
//   WatchIcon,
// } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import {Ctargt} from "@/components/ui/Ctargt";
import { Ctalft } from "@/components/ui/Ctalft";
import {StatSldr} from "@/components/shopping-view/state-slider"
import Footer from "@/components/ui/footer";
import { SuratSlidr } from "@/components/shopping-view/surat-feature";
import { GrRestroomWomen } from "react-icons/gr";
import { FaMale } from "react-icons/fa";
import { PiShirtFoldedFill, PiPantsFill } from "react-icons/pi";
import { IoShirt } from "react-icons/io5";
import { GiTShirt, GiWaterDrop } from "react-icons/gi";
import { CiDroplet } from "react-icons/ci";
import fvid from "@/assets/Slider_vid2.mp4"
import Popup from "@/components/auth/popup";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: FaMale },
  { id: "women", label: "Women", icon: GrRestroomWomen },
  // { id: "kids", label: "Kids", icon: BabyIcon },
  // { id: "accessories", label: "Accessories", icon: WatchIcon },
  // { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  // { id: "nike", label: "Nike", icon: Shirt },
  // { id: "adidas", label: "Adidas", icon: WashingMachine },
  // { id: "puma", label: "Puma", icon: ShoppingBasket },
  // { id: "levi", label: "Levi's", icon: Airplay },
  // { id: "zara", label: "Zara", icon: Images },
  // { id: "h&m", label: "H&M", icon: Heater },

  { id: "shirt", label: "Shirt", icon: PiShirtFoldedFill  },
  { id: "tshirt", label: "Tshirt", icon: IoShirt  },
  { id: "kurta", label: "Kurta", icon: GiTShirt  },
  { id: "pant", label: "Pant", icon: PiPantsFill  },
  { id: "halfsleeve", label: "Half Sleeve", icon: CiDroplet  },
  { id: "fullsleeve", label: "Full Sleeve", icon: GiWaterDrop  },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [popup, setpopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setpopup(true);
    }, 5000);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);



  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthenticated && <Popup trigger={popup} isAuth={true} setpopup={setpopup}></Popup>}
      <div className="relative w-full h-[600px] overflow-hidden flex justify-center"> {/* changes - remove flex */}
      <video
        src={fvid}
        className=" h-full object-cover" 
        // autoPlay
        loop
        muted
      ></video>
      {/*   
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-[700px] object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>*/}
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4" >
          <h2 className="text-6xl font-qwitcher-grypen font-bold text-thm text-center mb-8" >
            Shop by Gender
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 justify-center"> {/* changes lg:grid-cols-2 2 is for number of columns so set according to that */}
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-[0_5px_20px_4px_rgba(255,36,0,0.3)] transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-qwitcher-grypen font-bold text-thm  text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-[0_5px_20px_4px_rgba(255,36,0,0.3)] transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-qwitcher-grypen font-bold text-thm text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    popup = {popup}
                    setpopup = {setpopup}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

{/* JAIPUR */}
<StatSldr/>

{/* SURAT */}
<SuratSlidr/>

{/* Right CTA */}
<Ctargt/>


{/* Light CTA */}
<Ctalft/>

<Footer/>

{console.log("sending image -",productDetails?.image[0])}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        fstimg={productDetails?.image[0]}
      />
    </div>
  );
}

export default ShoppingHome;
