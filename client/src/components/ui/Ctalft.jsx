import * as React from "react"
import img from '../../assets/images/IMG_9440.JPG'
// import { cn } from "@/lib/utils"

const Ctalft = React.forwardRef(() => {
    return (
        <>
            <section class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
                <img
                    alt=""
                    src={img}
                    class=" ml-40 w-96 object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
                />
                <div class="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
                        Bandhej Bandhani
                        </h2>

                        <p class="hidden text-gray-500 md:mt-4 md:block">
                        Bandhej or Bandhani sarees are traditional Indian garments originating from Gujarat and Rajasthan, characterized by intricate tie-dye patterns. The process involves tightly tying fabric and dyeing it, creating vibrant designs. These sarees are often worn by brides and are celebrated for their cultural significance and craftsmanship.
                        </p>

                        <div class="mt-4 md:mt-8">
                            <a
                                href="#"
                                class="inline-block rounded bg-thm px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                Explore
                            </a>
                        </div>
                    </div>
                </div>


            </section>
        </>
    );
})

export { Ctalft }