import * as React from "react"
import img from '../../assets/images/IMG_9386.JPG'

// import { cn } from "@/lib/utils"

const Ctargt = React.forwardRef(() => {
  return (
    <>
      <section class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div class="p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
              Lehariya
            </h2>

            <p class="hidden text-gray-500 md:mt-4 md:block">
            The word "leheriya" is derived from the Sanskrit word “lahara” meaning “wave.” Leheriya is a traditional style of textile tie dye from Rajasthan. Its designs are inspired by the natural wave patterns formed by the wind blowing across the desert sands of western Rajasthan. This craft is exclusive to Rajasthan, with its main centers being the cities of Jaipur and Jodhpur.
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

        <img
          alt=""
          src={img}
          class="ml-40 w-96 object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section>
    </>
  );
})

export { Ctargt }