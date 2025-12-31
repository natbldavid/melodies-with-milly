import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath";

function PackageCard({ href, bg, imgSrc, imgAlt, title, imageOffsetY="translate-y-0" }) {
  return (
    <Link
      href={href}
      className="
        group block w-full
        focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-[#C9CAF8]
      "
      aria-label={title}
    >
      {/* Rectangular card: keep shape across breakpoints */}
      <div
        className="
          relative w-full
          aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10]
          rounded-2xl
          overflow-hidden
          flex items-center justify-center
        "
        style={{ backgroundColor: bg }}
      >
        {/* Image */}
        <div className={`relative w-[200%] h-[200%] ${imageOffsetY}`}>
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-contain"
            priority={false}
          />
        </div>

        {/* Hover overlay */}
        <div
          className="
            absolute inset-x-0 bottom-0
            translate-y-full group-hover:translate-y-0
            transition-transform duration-200
            bg-white/85
            text-center
            py-3
            font-bold
            text-[#2D2D2D]
          "
        >
          See More
        </div>
      </div>

      {/* Text below card */}
      <p className="mt-4 text-center text-white font-extrabold text-lg sm:text-xl">
        {title}
      </p>
    </Link>
  );
}

export default function HomeScreenPackages() {
  return (
    <section style={{ backgroundColor: "#C9CAF8" }}>
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-center text-white font-extrabold tracking-wide text-3xl sm:text-4xl">
          OUR PACKAGES
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <PackageCard
            href="/packages"
            bg="#FEE1B7"
            imgSrc={`${basePath}/images/snow-sister-princess-party-entertainer.avif`}
            imgAlt="One princess entertainment packages"
            title="One Entertainer Packages"
            imageOffsetY="translate-y-20 md:translate-y-10 lg:translate-y-20"
          />

          <PackageCard
            href="/packages"
            bg="#FFD6CE"
            imgSrc={`${basePath}/images/two-entertainer-princess.avif`}
            imgAlt="Two Princess entertainment packages"
            title="Two Entertainer Packages"
          />

          <PackageCard
            href="/packages"
            bg="#A1EABC"
            imgSrc={`${basePath}/images/virtual-package-princess.avif`}
            imgAlt="Princess virtual entertainment packages"
            title="Virtual Packages"
            imageOffsetY="-translate-y-15 md:-translate-y-8 lg:-translate-y-15"
          />
        </div>
  <div className="mt-10 sm:mt-10 flex justify-center">
    <Link
      href="/packages"
      className="
        inline-flex items-center justify-center rounded-full
        px-12 py-3 text-sm sm:px-20 sm:py-3 sm:text-base
        font-bold text-black transition-transform hover:scale-[1.02]
        focus:outline-none focus:ring-2 focus:ring-white/70
      "
      style={{ backgroundColor: '#FFF1E9' }}
    >
      View Packages
    </Link>
  </div>
      </div>
    </section>
  );
}
