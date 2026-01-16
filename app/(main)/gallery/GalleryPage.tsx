"use client";
import { Sparkles } from "lucide-react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

// --- RecentWorks Component ---
const RecentWorks: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F2EEE6]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/*
          GRID LAYOUT EXPLANATION:
          We use a 12-column grid.
          
          ROW 1 (Header):
          - Col 1-3:  Vertical Image (Left)
          - Col 4-9:  Title Text (Center)
          - Col 10-12: Square Image (Right)

          ROW 2 (Middle Section):
          - Col 1-3:  Tall Vertical (Far Left)
          - Col 4-9:  Complex Inner Grid (Center Block)
          - Col 10-12: Tall Vertical (Far Right)

          ROW 3 (Bottom Section):
          - Col 1-3:  Vertical Image (Left)
          - Col 4-6:  Square Image (Center-Left)
          - Col 7-12: Landscape Image (Right)
        */}

        <div className="grid grid-cols-12 gap-6 auto-rows-min">
          {/* --- ROW 1 --- */}

          {/* Top Left - Vertical */}
          <div className="col-span-12 md:col-span-3 row-span-2 relative h-[300px] md:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
              alt="Salad Pouring"
              className="w-full h-full object-cover rounded-sm shadow-sm"
            />
          </div>

          {/* Top Center - Title */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-center text-center z-10 py-10 md:py-0">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
              Our Recent
            </h2>
            <span className="text-4xl md:text-6xl text-[#D4B09E] font-bold">
              Works
            </span>
            <p className="text-gray-600 font-light mt-4 text-sm tracking-wide">
              Every frame tells a story of perfection
            </p>
          </div>

          {/* Top Right - Square */}
          <div className="col-span-12 md:col-span-3 relative h-[250px] md:h-[300px] self-start md:mt-[-50px]">
            <img
              src="https://plus.unsplash.com/premium_photo-1669150849080-241bf2ec9b4a?q=80&w=687&auto=format&fit=crop"
              alt="Outdoor Table"
              className="w-full h-full object-cover rounded-sm shadow-sm"
            />
          </div>

          {/* --- ROW 2 (Middle Complex Block) --- */}

          {/* Far Left - Woman holding dish (Tall) */}
          <div className="col-span-12 md:col-span-3 relative h-[400px] md:h-[500px] md:-mt-20">
            <img
              src="https://images.unsplash.com/photo-1576867757603-05b134ebc379?q=80&w=2070&auto=format&fit=crop"
              alt="Serving Dish"
              className="w-full h-full object-cover rounded-sm shadow-sm"
            />
          </div>

          {/* Center Block (Col 4-9) - 6 Columns internal */}
          <div className="col-span-12 md:col-span-6 grid grid-cols-6 gap-6 h-fit">
            {/* 3 Small Images in a Row */}
            <div className="col-span-2 h-[150px] md:h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1170&auto=format&fit=crop"
                alt="Buffet 1"
                className="w-full h-full object-cover rounded-sm shadow-sm"
              />
            </div>
            <div className="col-span-2 h-[150px] md:h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
                alt="Buffet 2"
                className="w-full h-full object-cover rounded-sm shadow-sm"
              />
            </div>
            <div className="col-span-2 h-[150px] md:h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop"
                alt="Buffet 3"
                className="w-full h-full object-cover rounded-sm shadow-sm"
              />
            </div>

            {/* Row 2 of Center Block */}
            {/* Left: Square */}
            <div className="col-span-3 h-[250px] md:h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop"
                alt="Food Box"
                className="w-full h-full object-cover rounded-sm shadow-sm"
              />
            </div>
            {/* Right: Wide */}
            <div className="col-span-3 h-[250px] md:h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop"
                alt="Food Dish"
                className="w-full h-full object-cover rounded-sm shadow-sm"
              />
            </div>
          </div>

          {/* Far Right - Woman holding plate (Tall) */}
          <div className="col-span-12 md:col-span-3 relative h-[350px] md:h-[450px] md:mt-20">
            <img
              src="https://images.unsplash.com/photo-1629854728526-1d547f42cf53?q=80&w=2070&auto=format&fit=crop"
              alt="Holding Plate"
              className="w-full h-full object-cover rounded-sm shadow-sm"
            />
          </div>

          {/* --- ROW 3 (Bottom) --- */}

          {/* Bottom Left - Vertical */}
          <div className="col-span-12 md:col-span-4 h-[350px] md:h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1549488497-69b76c8cbe11?q=80&w=2070&auto=format&fit=crop"
              alt="Charcuterie"
              className="w-full h-full object-cover rounded-sm shadow-sm"
            />
          </div>

          {/* Bottom Center - Small Square */}
          <div className="col-span-12 md:col-span-3 h-[200px] md:h-[250px]">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
              alt="Small Bites"
              className="w-full h-full object-cover rounded-sm shadow-sm"
            />
          </div>

          {/* Bottom Right - Large Vertical/Landscape */}
          <div className="col-span-12 md:col-span-5 h-[400px] md:h-[500px] md:-mt-20">
            <img
              src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2071&auto=format&fit=crop"
              alt="Feast Table"
              className="w-full h-full object-cover rounded-sm shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Component ---
const Testimonials: React.FC = () => {
  return (
    <section className="bg-[#403D3D] lg:py-20 md:py-32 lg:pb-40 md:pb-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="flex justify-center mb-4 text-green-500">
            <Sparkles size={40} strokeWidth={1} />
          </div>
          <h2 className="text-5xl md:text-7xl font-semibold text-white mb-2 leading-tight">
            Voice of <br />
            <span className="text-orange text-6xl md:text-8xl relative block mt-2">
              Distinction
            </span>
          </h2>
        </div>

        {/* Testimonial 1: Text Left, Image Right */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24 md:mb-32">
          <div className="w-full md:w-1/2 md:pr-12 order-2 md:order-1 bg-white/10 lg:lg:py-32 py-16 border-l-4 border-orange ">
            <div className="pl-8 py-2 relative">
              <p className=" text-xl md:text-2xl text-white italic leading-relaxed mb-8">
                "AYADI transformed our wedding into an unforgettable culinary
                journey. The attention to detail was extraordinary, and our
                guests still speak of it as the finest event they've attended."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-orange"></div>
                <div>
                  <h4 className="text-white  text-lg tracking-wide">
                    Princess Noura Al-Saud
                  </h4>
                  <p className="text-white text-xs uppercase tracking-widest mt-1">
                    Royal Wedding Celebration
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative order-1 md:order-2 group">
            <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Event Setup"
              className="w-full h-full object-cover relative z-10 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Testimonial 2: Image Left, Text Right */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24 md:mb-32">
          <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative group">
            <div className="absolute inset-0 border border-white/10 -translate-x-4 translate-y-4 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Diplomatic Dinner"
              className="w-full h-full object-cover relative z-10 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-12 border-l-4 border-orange bg-white/10 lg:py-32 py-16">
            <div className="pl-8 py-2">
              <p className=" text-xl md:text-2xl text-white italic leading-relaxed mb-8">
                "Impeccable service, exquisite presentation, and flavors that
                delighted our international guests. AYADI set a new benchmark
                for diplomatic events in the Kingdom."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-orange"></div>
                <div>
                  <h4 className="text-white  text-lg tracking-wide">
                    Ambassador Khalid Al-Fahad
                  </h4>
                  <p className="text-white text-xs uppercase tracking-widest mt-1">
                    G20 Diplomatic Dinner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial 3: Text Left, Image Right */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 md:pr-12 order-2 md:order-1 border-l-4 border-orange bg-white/10 lg:py-32 py-16">
            <div className="pl-8 py-2">
              <p className=" text-xl md:text-2xl text-white italic leading-relaxed mb-8 w-[80%]">
                "From concept to execution, AYADI exceeded every expectation.
                They understand the essence of Saudi hospitality and elevate it
                to an art form."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-orange"></div>
                <div>
                  <h4 className="text-white  text-lg tracking-wide">
                    Sheikh Mohammed Al-Rajhi
                  </h4>
                  <p className="text-white text-xs uppercase tracking-widest mt-1">
                    Private Estate Celebration
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative order-1 md:order-2 group">
            <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            <img
              src="https://plus.unsplash.com/premium_photo-1673809798970-30c14cfd0ab6?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Private Estate"
              className="w-full h-full object-cover relative z-10 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- StressFree Component ---
const StressFree: React.FC = () => {
  return (
    <section className="bg-green-500 lg:py-40 my-16 md:py-32 py-24 lg:my-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <img
          src="/bg/gallery-2.png"
          className=" h-full object-cover absolute"
          alt=""
        />
        <img
          src="/bg/gallery-1.png"
          className=" h-full object-cover right-0 absolute"
          alt=""
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <img src="/bg/gallery-bg.png" alt="" />
        <h2 className="text-4xl md:text-6xl  text-white mb-6 tracking-wide leading-tight">
          HOSTING DOESN'T <br />
          HAVE TO BE STRESSFUL
        </h2>
        <p className="text-white/90 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          With AYADI, hosting is stress-free. We take care of the details, so
          you can enjoy the moments that matter.
        </p>

        <button className="bg-orange-700 hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-medium transition-colors duration-300 flex items-center gap-2 mx-auto cursor-pointer">
          Whatsapp <FaWhatsapp size={24} />
        </button>
      </div>
    </section>
  );
};

// --- Main App Component ---
function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <RecentWorks />
      <Testimonials />
      <StressFree />
    </div>
  );
}

export default GalleryPage;
