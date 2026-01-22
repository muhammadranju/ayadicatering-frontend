import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa6";

function CTA_SECTION() {
  const { t } = useTranslation();
  return (
    <section className="bg-green-500 lg:py-40 py-24 mb-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Image 1: Bottom Layer */}
        <Image
          width={400}
          height={400}
          src="/bg/gallery-2.png"
          className=" h-full object-cover absolute left-0"
          alt=""
        />
        <Image
          width={400}
          height={400}
          src="/bg/gallery-1.png"
          className=" h-full object-cover right-0 absolute"
          alt=""
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl  text-white mb-6 tracking-wide leading-tight">
          {t("gallery.stressFreeTitle")}
          <br />
          {t("gallery.stressFreeTitle2")}
        </h2>
        <p className="text-white/90 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          {t("gallery.stressFreeDesc")}
        </p>

        <button className="bg-orange-700 hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-medium transition-colors duration-300 flex items-center gap-2 mx-auto cursor-pointer">
          {t("gallery.whatsapp")} <FaWhatsapp size={24} />
        </button>
      </div>
    </section>
  );
}

export default CTA_SECTION;
