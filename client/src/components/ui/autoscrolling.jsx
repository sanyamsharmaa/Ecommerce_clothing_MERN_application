import React, { useRef, useEffect } from 'react';

function InfiniteScroll() {

    return (
        <div className="flex space-x-16 group bg-red text-white overflow-hidden" >

            <div class="flex space-x-16 w-1/2 animate-loop-scroll h-8 group-hover:paused ">
                <div loading="lazy" className="flex-grow shrink-0">Navratri sale </div>
                <div loading="lazy" className="flex-grow shrink-0">70% off </div>
                <div loading="lazy" className="flex-grow shrink-0">Flat 20% Off on Prepaid Orders above ₹ 3,000/-</div>
                {/* <div loading="lazy" className="flex-grow shrink-0">Use Coupon Code FESTIVE2024</div> */}
            </div>
{/* 
            <div class="flex space-x-16 animate-loop-scroll  w-1/2  h-8  absolute top-0 left-full group-hover:paused overflow-hidden" aria-hidden="true">
                <div loading="lazy" className="flex-grow shrink-0">Navratri sale </div>
                <div loading="lazy" className="flex-grow shrink-0">70% off </div>
                <div loading="lazy" className="flex-grow shrink-0">Flat 20% Off on Prepaid Orders above ₹ 3,000/-</div>
                <div loading="lazy" className="flex-grow shrink-0">Use Coupon Code FESTIVE2024</div>
            </div> */}
        </div>
    );
}

export default InfiniteScroll;





