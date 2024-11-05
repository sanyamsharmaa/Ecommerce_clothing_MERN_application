// import logo from './logo.svg';
// import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as React from "react"
import img1 from '../../assets/images/IMG_0181.JPG'
import img2 from '../../assets/images/IMG_0192.JPG'
import img3 from '../../assets/images/IMG_0239.JPG'
import img4 from '../../assets/images/IMG_9163.JPG'
import img5 from '../../assets/images/IMG_9201.JPG'
import img6 from '../../assets/images/IMG_9272.JPG'

const data=[
  {
    image:img1,
    title:'Sanganeeri Printed Shirt',
  },
  {
    image:img2,
    title:'Jaipur Sanganeeri Printed Shirt',
  },
  {
    image:img3,
    title:'Jaipur Sanganeeri Printed Shirt',
  },

  {
    image:img4,
    title:'Jaipur Sanganeeri Printed Shirt',
  },
  {
    image:img5,
    title:'Jaipur Sanganeeri Printed Shirt',
  },
  {
    image:img6,
    title:'Jaipur Sanganeeri Printed Shirt',
  },
]

// const updatedData = await Promise.all(
//     data.map(async (item) => ({
//       ...item,
//       image: await import(/* @vite-ignore */ item.image),
//     }))
//   );

const  StatSldr= React.forwardRef(() => {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1500
};

// console.log(data[0].image)
  return (
    <div className='h-auto pt-10 bg-lgthm my-10'>
        <div className="pb-10">
            <h2 className="text-center text-5xl font-bold mb-3">Jaipur Special</h2>
            <div className="text-center px-80" >Jaipur, Rajasthan is renowned for its vibrant and diverse saree styles that reflect the region's rich cultural heritage. with Bandhani Sarees, Leheriya Sarees, Kota Doria Sarees and many more</div>
        </div>

      <div className='w-5/6 m-auto mb-10'>
      <Slider {...settings}>
        {
          data.map((item,index)=>{
            return(
              <div key={index} className=' mx-2'>
                <div>
                  <img src={item.image} className='w-80 h-auto object-contain block m-auto'/>
                </div>

                <div className='p-2 bg-blue-600 '>
                  <p className='font-semibold text-black text-center'>{item.title}</p>
                </div>
              </div>
            )
          })
        }
      </Slider>
      </div>
    </div>
  );
});

export  {StatSldr};