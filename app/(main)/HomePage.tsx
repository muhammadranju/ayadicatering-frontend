"use client";

import { ChooseYourWay } from "@/components/pages/home/ChooseYourWay";
import Image from "next/image";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="">
        <section className="relative  lg:container md:max-w-7xl mx-auto flex items-center overflow-hidden py-5 lg:py-24 md:py-20 ">
          {/* Background Watermark Letter "A" - Stylized */}
          <div className="absolute top-1/2 left-0 md:left-20 transform -translate-y-1/2 opacity-[0.05] select-none pointer-events-none">
            <span className="text-[400px] md:text-[600px] text-primary font-medium leading-none">
              A
            </span>
          </div>
          <div className="absolute top-1/2 left-40 md:left-110 transform -translate-y-1/2 opacity-[0.05] select-none pointer-events-none">
            <span className="text-[400px] md:text-[600px] text-primary font-medium leading-none">
              Y
            </span>
          </div>

          <div className="lg:container md:max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="space-y-6 pt-10 md:pt-0">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight">
                {t("home.heroTitle")}
                <br />
                <span className="text-primary italic">
                  {t("home.heroTitleSpan")}
                </span>
              </h1>

              <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed font-extralight">
                {t("home.heroSubtitle")}
              </p>
            </div>

            {/* Right Image */}
            <div className="relative mt-8 md:mt-0">
              {/* Pinkish background shape behind image */}
              <div className="absolute -top-0.5 -right-4 lg:w-[690px] lg:h-[595px] bg-[#E07A5F33] rounded-sm -z-10 rotate-1 "></div>

              <div className="relative rounded-lg overflow-hidden  -rotate-2">
                <Image
                  width={1200}
                  height={600}
                  src="/bg/hpme-page-pattern.png"
                  alt="Elegant catering setup"
                  className="lg:w-[700px] lg:h-[600px] md:w-full md:h-full object-cover lg:aspect-[4/3] md:aspect-[16/9] lg:rounded-md rounded-xl"
                />
              </div>

              {/* Circular Badge */}
              <div className="absolute -bottom-10 -left-6 md:-bottom-12 md:-left-12 w-32 h-32 md:w-40 md:h-40 bg-primary rounded-full flex items-center justify-center shadow-lg sr-only">
                {/* Rotating Text Container */}
                <div className="relative w-full h-full animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="transparent"
                    />
                    <text
                      fill="white"
                      fontSize="11"
                      letterSpacing="1"
                      fontWeight="bold"
                    >
                      <textPath href="#circlePath" startOffset="0%">
                        {" . "} {t("home.modernHospitality")} {" . "}{" "}
                        {t("home.modernHospitality")}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ChooseYourWay />
    </>
  );
}

export default HomePage;
