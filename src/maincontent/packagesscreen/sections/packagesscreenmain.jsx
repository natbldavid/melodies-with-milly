"use client";

import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath";

function PackageCard({
  href,
  onClick,
  bg,
  imgSrc,
  imgAlt,
  title,
  imageOffsetY = "translate-y-0",
}) {
  const sharedClasses = `
    group block w-full
    focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-[#C9CAF8]
  `;

  const CardInner = (
    <>
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
      <p className="mt-4 text-center font-extrabold text-lg sm:text-xl">
        {title}
      </p>
    </>
  );

  // If onClick exists, render as a button (in-page swap)
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={sharedClasses} aria-label={title}>
        {CardInner}
      </button>
    );
  }

  // Otherwise render as a Link (real navigation)
  return (
    <Link href={href || "/"} className={sharedClasses} aria-label={title}>
      {CardInner}
    </Link>
  );
}

export default function PackagesScreenMain({ onNavigate }) {
  return (
    <section>
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-center font-extrabold tracking-wide text-3xl sm:text-4xl">
          OUR PACKAGES
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <PackageCard
            onClick={() => onNavigate("one-entertainer")}
            bg="#FEE1B7"
            imgSrc={`${basePath}/images/snow-sister-princess-party-entertainer.avif`}
            imgAlt="One princess entertainment packages"
            title="One Entertainer Packages"
            imageOffsetY="translate-y-20 md:translate-y-10 lg:translate-y-20"
          />

          {/* These will swap views once you create the screens */}
          <PackageCard
            onClick={() => onNavigate("two-entertainer")}
            bg="#FFD6CE"
            imgSrc={`${basePath}/images/two-entertainer-princess.avif`}
            imgAlt="Two Princess entertainment packages"
            title="Two Entertainer Packages"
          />

          <PackageCard
            onClick={() => onNavigate("virtual-entertainer")}
            bg="#A1EABC"
            imgSrc={`${basePath}/images/virtual-package-princess.avif`}
            imgAlt="Princess virtual entertainment packages"
            title="Virtual Packages"
            imageOffsetY="-translate-y-15 md:-translate-y-8 lg:-translate-y-15"
          />
        </div>
      </div>
    </section>
  );
}
