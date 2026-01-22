"use client";
import { Award, Heart, Sparkles, LucideProps } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Trans, useTranslation } from "react-i18next";

const Hero = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-gray-100">
      {/* Background Image: Using a baking/cookies image similar to the reference */}
      <Image
        src="/bg/about-hero.png"
        alt="Cookies and Recipe Book"
        fill
        className="object-cover object-center opacity-90"
      />

      {/* Overlay gradient to soften */}
      <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>
    </div>
  );
};

const OurStory = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 w-full">
      <div className="absolute inset-0 bg-white/0 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Text Content */}
        <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
          <span className="uppercase text-xs tracking-[0.2em] text-gray-500 font-bold mt-4 lg:mt-0">
            {t("about.storyLabel")}
          </span>

          <h2 className="text-4xl md:text-7xl  tracking-wide  text-gray-900 font-semibold leading-tight">
            {t("about.meaningTitle")} <br />
            {t("about.meaningTitle2")} <br />
            <span className="text-orange-500 ">
              {t("about.meaningTitleSpan")}
            </span>
          </h2>

          <div className="space-y-6 text-gray-900  text-lg leading-relaxed">
            <p className="font-medium">
              <Trans
                i18nKey="about.meaningDesc1"
                components={[
                  <strong className="text-orange-500 text-2xl " key="0">
                    AYADI
                  </strong>,
                ]}
              />
            </p>

            <p className="text-base text-gray-600">{t("about.meaningDesc2")}</p>

            <p className="text-base text-gray-600">{t("about.meaningDesc3")}</p>

            <hr className="border-[1px] border-gray-800 w-full my-6" />

            <blockquote className="font-light text-2xl md:text-3xl italic text-black leading-snug pt-4">
              <Trans
                i18nKey="about.quote"
                components={[
                  <span className="  text-orange-500" key="0">
                    memories
                  </span>,
                ]}
              />
            </blockquote>
          </div>
        </div>

        {/* Images Collage */}
        <div className="order-1 lg:order-2 relative h-[500px] md:h-[600px] lg:h-[700px] w-full flex items-center justify-center lg:justify-end">
          {/* Main Large Image (Interior) - Static */}
          <div className="relative w-full max-w-md md:max-w-lg h-[400px] md:h-[500px] lg:h-[550px] bg-gray-200 overflow-hidden shadow-xl z-10 self-start">
            <Image
              src="/bg/about-story.jpg"
              alt="Ornate Arabic Interior"
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Overlapping Interactive Component - Small Image Cluster */}
          <div className="absolute -bottom-0 lg:bottom-10 right-0 z-20 w-48 h-48 md:w-64 md:h-64 group">
            <motion.div
              className="relative w-full h-full cursor-pointer"
              initial="initial"
              whileHover="animate"
              animate="initial"
            >
              {/* Back Card Left - Floats Up & Left */}
              <motion.div
                className="absolute inset-0 overflow-hidden shadow-lg  origin-bottom-right"
                variants={{
                  initial: { rotate: 0, x: 0, y: 0, opacity: 0 },
                  animate: { rotate: -15, x: -120, y: -50, opacity: 1 },
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                <Image
                  src="https://plus.unsplash.com/premium_photo-1698867575634-d39ef95fa6a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Arabic Food Spread"
                  fill
                  className="object-cover rounded"
                />
              </motion.div>

              {/* Back Card Right - Floats Up & Right */}
              <motion.div
                className="absolute inset-0 overflow-hidden shadow-lg  origin-bottom-left"
                variants={{
                  initial: { rotate: 0, x: 0, y: 0, opacity: 0 },
                  animate: { rotate: 15, x: 120, y: -50, opacity: 1 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: 0.05,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Sharing Food"
                  fill
                  className="object-cover rounded"
                />
              </motion.div>

              {/* Main Front Card - Stays put but scales slightly */}
              <motion.div
                className="absolute inset-0 overflow-hidden shadow-2xl rounded  z-20 bg-gray-800"
                variants={{
                  initial: { scale: 1 },
                  animate: {
                    scale: 1.02,
                    rotate: 0,
                    x: 0,
                    y: -120,
                    opacity: 1,
                  },
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"
                  alt="Hands holding bread black and white"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 contrast-125 rounded-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OurPromiseCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}) => (
  <div className="bg-[#4A4747] p-8 md:p-10 flex flex-col items-start space-y-4 hover:border-ayadi-accent/50 transition duration-300 group h-full rounded">
    <Icon className="w-10 h-10 text-ayadi-accent stroke-[1.5] mb-2 group-hover:scale-110 transition-transform duration-300 text-orange" />
    <h3 className="text-2xl  text-white font-medium">{title}</h3>
    <p className="text-neutral-400  leading-relaxed text-sm ">{description}</p>
  </div>
);

const OurPromise = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-ayadi-dark py-20 px-6 md:px-12 lg:px-24 bg-[#403D3D] mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="uppercase text-sm tracking-[0.2em] text-green-500 font-bold block mb-4">
            {t("about.promiseLabel")}
          </span>
          <h2 className="text-5xl md:text-6xl  text-white font-bold">
            {t("about.promiseTitle")}{" "}
            <span className=" text-orange-500">
              {t("about.promiseTitleSpan")}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <OurPromiseCard
            icon={Heart}
            title={t("about.promise1Title")}
            description={t("about.promise1Desc")}
          />
          <OurPromiseCard
            icon={Award}
            title={t("about.promise2Title")}
            description={t("about.promise2Desc")}
          />
          <OurPromiseCard
            icon={Sparkles}
            title={t("about.promise3Title")}
            description={t("about.promise3Desc")}
          />
        </div>
      </div>
    </section>
  );
};

function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Hero />
      <OurStory />
      <OurPromise />
    </div>
  );
}

export default AboutPage;
