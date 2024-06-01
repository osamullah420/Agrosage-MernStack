import React from "react";

const Aboutus = () => {
  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-40 pt-10 flex flex-col  justify-center items-center gap-8">
          <div className="text-center space-y-7 px-4 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Empowering Agricultural Commerce:
              <span className="text-green"> Our Story</span>
            </h2>
            <p className="text-xl text-[#4A4A4A]  md:w-4/5 mx-auto">
              "At AgroSage, we're more than just a platform - we're a community
              dedicated to revolutionizing agricultural commerce. Our journey
              began with a simple idea: to streamline trade and communication,
              enhancing businesses in the agricultural sector. AgroSage is
              committed to empowering both buyers and sellers. Through
              innovation and dedication, we strive to create a seamless
              experience, connecting retailers, and companies in a dynamic
              marketplace. Join us as we redefine the future of agricultural
              commerce, one transaction at a time."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
