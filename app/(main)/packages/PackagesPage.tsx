import { ArrowRight, User } from "lucide-react";
import React from "react";

const PackagesPage: React.FC = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-7xl font-tinos text-black">
            Set Packages
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto">
            Choose from our carefully curated packages, each designed to create
            unforgettable dining experiences
          </p>
        </div>

        {/* Card Container - Centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-[400px] border border-gray-100 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative h-64">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"
                alt="Classic Family Feast"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-[2px] text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium">
                <User size={16} strokeWidth={2} />
                <span>10 guests</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-gray-900">
                  Classic Family Feast
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  Curated family-style feasts for intimate gatherings
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl arimo text-amber-700 font-normal">
                  1250
                </span>
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  SAR
                </span>
              </div>

              {/* Menu Includes */}
              <div className="space-y-3">
                <span className="text-gray-500 text-sm block">
                  Menu includes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Appetizers", "Salads", "Main Courses"].map((item) => (
                    <span
                      key={item}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-[4px] text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-[4px] text-xs font-medium">
                    +2 more
                  </span>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-green-500 hover:bg-green-700 text-white py-3.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 mt-2">
                Select Package
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesPage;
