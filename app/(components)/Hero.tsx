import React from "react";
import Image from "next/image";
const Home = () => {
  return (
    <section className="pt-10 pb-5 md:pt-20 md:pb-10">
      <div className="container mx-auto px-8 lg:flex lg:items-center">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">
           Email Signature Generator
          </h1>
          <p className="text-xl lg:text-2xl mt-6 font-light">
            Create professional-looking email signatures with ease and 
            elevate your online presence
          </p>
        </div>
        <div className="lg:w-1/2">
         <Image src="/hero-banner.png" alt="alt" width="600" height="400" />
        </div>
      </div>
    </section>
  );
};

export default Home;
