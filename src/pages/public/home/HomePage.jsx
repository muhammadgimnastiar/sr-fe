"use client";

import NavbarComponent from "../../../components/NavbarComponent";
import FooterComponent from "../../../components/FooterComponent";
import MarqueeComponent from "../../../components/MarqueeComponent";
import { FloatButton } from "antd";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import "./styles.css";

export default function HomePage() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <main className="min-h-screen">
        <NavbarComponent />
        <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
        <div className="container mx-auto">
          <div className="grid max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 my-10 lg:pt-8 xl:pt-24">
            <div className="lg:col-span-7 sm:pt-16 sm:text-center md:text-center lg:text-start xl:text-start pt-12 max-[640px]:px-12">
              <motion.div
                className="font-black text-primary sm:text-5xl md:text-5xl lg:text-7xl xl:text-7xl text-5xl max-[640px]:text-center max-[640px]:text-3xl"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Recycling Made Easier
              </motion.div>
              <div className="mt-8 text-textColor font-normal sm:text-xl md:text-xl lg:text-xl xl:text-xl xl:px-0 lg:px-0 md:px-0 sm:px-12 max-[640px]:text-center max-[640px]:text-lg">
                Welcome to our website, a space where we encourage positive transformation by repurposing waste, contributing to the preservation of our planets green and sustainable future.
              </div>
            </div>
            <motion.div
              className="flex justify-center items-center justify-items-center justify-self-center md:my-12 sm:mx-12 sm:my-12 md:mx-12 lg:mx-12 xl:mx-12 lg:mt-0 lg:col-span-5 max-[640px]:px-12 max-[640px]:pb-8"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src="/illustration.png" alt="Smart Recycling Logo" width={700} height={700} />
            </motion.div>
          </div>
          <MarqueeComponent />
        </div>

        <motion.section className="bg-gray-50">
          <div className=" text-center py-24 px-6">
            <figure className="">
              <svg className="h-12 mx-auto mb-3 text-gray-400" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                ></path>
              </svg>
              <p className="text-xl font-medium text-textColor md:text-2xl">It is horrifying that we have to fight our own government to save the environment.</p>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img src={"https://cdn.shopify.com/s/files/1/0251/0939/7584/files/1-Ansel-Adams-479x500_large.jpg?v=1570145018?"} alt="Picture of the author" width={100} height={100} className="w-10 h-10 rounded-full" />
                <div className="flex items-center divide-x-2 divide-gray-500">
                  <div className="pr-3 font-medium text-textColor">Ansel Adam</div>
                  <div className="pl-3 text-sm font-light text-gray-500">American landscape photographer</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </motion.section>

        <section className="object-none bg-[url('https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/05/28/Desain-tanpa-judul-2023-05-28T115130481-2054438804.png')] bg-gray-700 bg-blend-multiply">
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
              At Smart Recycling, our primary commitment lies in revolutionizing rubbish disposal through the power of technology, innovation, and strategic investment.
            </p>
          </div>
        </section>

        <section>
          <div className="py-8 px-12 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">We help people dispose of rubbish</h1>
              <p className="mb-8 text-lg font-normal text-textColor lg:text-xl">
                {
                  "At Smart Recycling, we`re dedicated to transforming the way you handle waste management, making it easier and more convenient for you to dispose of rubbish. Our innovative solutions are designed to simplify the process, ensuring a cleaner and more sustainable environment for all."
                }
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link to={"/contact"}>
                  <div className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-green-700 focus:ring-4 focus:ring-blue-300 hover:shadow-md transition-transform transform-gpu hover:translate-y-1">
                    Contact Us
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </div>
                </Link>
                <Link to={"/about"}>
                  <div className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 hover:shadow-md transition-transform transform-gpu hover:translate-y-1">
                    Learn more
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <iframe
                className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
                src="https://www.youtube.com/embed/2aMdLunK1Go?si=IlTCL6gk0GRrBbCk"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <FloatButton.BackTop />
      <FooterComponent />
    </>
  );
}
