"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

// FAQ Data Structure
const FAQS = [
  {
    id: "01",
    question: "What is “Gatherings by Ayadi”?",
    answer:
      "Gatherings by Ayadi  is designed for sharing with family and friends. Each order arrives carefully packed and ready to place directly on your table, so you can focus on enjoying the moment. ",
  },
  {
    id: "02",
    question: "What’s included in “Gatherings by Ayadi”?",
    answer:
      "Each menu includes six thoughtfully designed dishes to accommodate up to 10 guests, ready to be served. Effortless for you, beautiful for your guests.",
  },
  {
    id: "03",
    question: "Does Ayadi offer same day ordering?",
    answer:
      "Yes, absolutely. To give every meal the attention it deserves, we ask for a minimum of 5 hours from confirmation to delivery",
  },
  {
    id: "04",
    question: "How is my order delivered?",
    answer:
      "Every order is handled with attention and care. Your dishes are delivered on time, in temperature-controlled boxes to preserve freshness and flavor.",
  },
  {
    id: "05",
    question: "Can I make changes after I’ve placed my order?",
    answer:
      "If you would like to adjust your order, please contact  us as soon as possible and we will do our best to accommodate. Once preparation has begun, changes may not be available.",
  },
  {
    id: "06",
    question: "What if I need to cancel my order?",
    answer:
      "We understand that plans can change. Cancellations made more than 48 hours before delivery can be redeemed as credit to use within 2 months. Please note that any cancellations made within 48 hours are not possible, as preparations will already be underway.",
  },
  {
    id: "07",
    question: "How can I reach Ayadi?",
    answer:
      "The Ayadi concierge team is delighted to serve you daily from 10 AM to 10 PM. Reach us through WhatsApp, and we will guide you through every detail.",
  },
];

const FaqPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string>("06");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? "" : id);
  };

  return (
    <main className="w-full">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[800px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/bg/faq-bg.png")',
          }}
        ></div>
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white mt-[380px] px-4 md:px-16">
          <h1 className="font-tinos text-4xl md:text-5xl lg:text-7xl mb-6 drop-shadow-lg leading-tight">
            You Have Questions, We Have Answers
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-4xl text-gray-100 font-light leading-relaxed">
            Everything you need to know about our catering from menus to service
            designed to make your event effortless and memorable.
          </p>
        </div>
      </div>

      {/* 2. FAQ SECTION */}
      <div className=" py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Left Column: Heading */}
          <div className="lg:w-1/2 pt-4">
            <h2 className="font-tinos text-5xl md:text-6xl text-charcoal leading-tight">
              Frequently Asked <br />
              <span className="text-amber-700 ">Question</span>
            </h2>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:w-2/3 w-full">
            <div className="divide-y divide-gray-200">
              {FAQS.map((faq) => (
                <div key={faq.id} className="py-6 md:py-8 group  ">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-start justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-start gap-6 md:gap-8">
                      <span className="font-tinos text-xl md:text-2xl italic font-bold mt-1 ">
                        {faq.id}
                      </span>
                      <span className="font-tinos text-xl md:text-2xl text-charcoal font-bold mt-1 group-hover:text-terracotta transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div className="ml-4 mt-1">
                      {openFaq === faq.id ? (
                        <div className="rounded-full border border-charcoal p-1">
                          <Minus className="w-6 h-6 text-gray-600" />
                        </div>
                      ) : (
                        <div className="rounded-full border border-gray-300 p-1 group-hover:border-terracotta transition-colors">
                          <Plus className="w-6 h-6 text-gray-600 group-hover:text-terracotta" />
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openFaq === faq.id
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pl-[3.5rem] md:pl-[5rem] text-gray-600 leading-relaxed text-lg max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. CTA SECTION */}
      <section className="bg-green-500 lg:py-40 py-24 mb-20 relative overflow-hidden">
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
    </main>
  );
};

export default FaqPage;
