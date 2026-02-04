import Image from "next/image";
import { images } from "./GalleryPage";

export const GalleryImage = ({
  imageKey,
  onClick,
}: {
  imageKey: string;
  onClick?: () => void;
}) => {
  const image = images[imageKey as keyof typeof images];
  if (!image) return null;

  return (
    <div
      className="group relative w-full h-full cursor-pointer"
      onClick={onClick}
    >
      <Image
        objectFit="cover"
        layout="fill"
        quality={20}
        src={image.src}
        alt={image.alt}
        className="object-cover rounded-sm shadow-sm"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm">
        <h5 className="text-xl md:text-2xl font-semibold text-white px-4 text-center">
          {image.title}
        </h5>
        {image.desc && (
          <p className="text-white text-sm md:text-base mt-2 px-4 text-center">
            {image.desc}
          </p>
        )}
      </div>
    </div>
  );
};
