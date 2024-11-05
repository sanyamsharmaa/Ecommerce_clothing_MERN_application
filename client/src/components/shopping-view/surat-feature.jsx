// import logo from './logo.svg';
// import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as React from "react"
import img1 from '../../assets/images/surt1.png'
import img2 from '../../assets/images/surt2.png'
import img3 from '../../assets/images/surt3.png'

const data=[
  {
    image:img1,
    title:'Saree 1',
  },
  {
    image:img2,
    title:'Saree 2',
  },
  {
    image:img3,
    title:'Saree 3',
  },

  {
    image:img1,
    title:'Saree 1',
  },
  {
    image:img2,
    title:'Saree 2',
  },
  {
    image:img3,
    title:'Saree 3',
  },

  {
    image:img1,
    title:'Saree 1',
  },
  {
    image:img2,
    title:'Saree 2',
  },
  {
    image:img3,
    title:'Saree 3',
  },
]


const  SuratSlidr= React.forwardRef(() => {

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
            <h2 className="text-center text-5xl font-bold mb-3">Surat Special</h2>
            <div className="text-center px-80" >Surat is renowned for its exquisite saree varieties, including traditional Gujarati sarees, elegant Banarasi sarees, and vibrant Net sarees.</div>
        </div>

      <div className='w-5/6 m-auto mb-10'>
      <Slider {...settings}>
        {
          data.map((item,index)=>{
            return(
              <div key={index} className=' mx-2'>
                <div>
                  <img src={item.image} className='w-80 h-80 object-contain block m-auto'/>
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

export  {SuratSlidr};