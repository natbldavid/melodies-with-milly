"use client";

import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath";
import { useState } from "react";

/** Flower mask (same approach as your Hero) */
function buildFlowerMaskSvg({
  size = 150,
  lobes = 12,
  baseRadius = 72,
  lobeDepth = 3,
  rotation = -Math.PI / 2,
  steps = 480,
} = {}) {
  const cx = size / 2;
  const cy = size / 2;

  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 + rotation;
    const r = baseRadius + lobeDepth * Math.cos(lobes * t);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    pts.push([x, y]);
  }

  const d =
    pts
      .map(([x, y], idx) => `${idx === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ") + " Z";

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <path d="${d}" fill="white"/>
</svg>
`.trim();
}

const FLOWER_MASK_SVG = buildFlowerMaskSvg();
const FLOWER_MASK_URL = `data:image/svg+xml,${encodeURIComponent(FLOWER_MASK_SVG)}`;

function buildRhombusPatternDataUrl({ color = "#ffffff", opacity = 0.22 } = {}) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <g fill="${color}" fill-opacity="${opacity}">
      <!-- diamond/rhombus tiles -->
      <polygon points="40,4 76,40 40,76 4,40"/>
      <!-- offset tile for a repeating feel -->
      <polygon points="0,44 36,80 0,116 -36,80"/>
      <polygon points="80,44 116,80 80,116 44,80"/>
    </g>
  </svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Character card
 * - Uses aspect-square so every box stays perfectly square at every breakpoint
 * - Uses width: 100% so it expands to fill the grid column
 */
function CharacterCard({
  href,
  boxBg,
  maskType, // "flower" | "square"
  maskBg,
  maskBorder, // optional (for square)
  labelBg,
  labelText,
  labelColor,
  imgSrc,
  imgAlt,
  patternColor,
  patternOpacity,
  power = "My power is...",
}) {
  const [isActive, setIsActive] = useState(false);

  const CardInner = (
    <div
      className="
        relative w-full aspect-square
        rounded-2xl overflow-hidden
        p-4 sm:p-5
        flex items-center justify-center
        group
      "
      style={{
        backgroundColor: boxBg,
        backgroundImage: `url("${buildRhombusPatternDataUrl({
          color: patternColor || "#ffffff",
          opacity: patternOpacity ?? 0.1,
        })}")`,
        backgroundSize: "90px 90px",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setIsActive((v) => !v);
      }}
      aria-label={labelText}
    >
      {/* Mask wrapper (reserve space for label + ensure consistent label height) */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Center mask */}
        {maskType === "flower" ? (
          // Wrapper is NOT masked, so overlays (label) are never clipped
          <div
            className="
              relative
              w-[95%] sm:w-[95%] md:w-[95%]
              aspect-square
            "
          >
            {/* Masked shape (background + image) */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundColor: maskBg,
                WebkitMaskImage: `url("${FLOWER_MASK_URL}")`,
                maskImage: `url("${FLOWER_MASK_URL}")`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="
              relative
              w-[95%] sm:w-[95%] md:w-[95%]
              aspect-square
              rounded-4xl
              border-[6px]
            "
            style={{
              backgroundColor: maskBg,
              borderColor: maskBorder || "transparent",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                className="object-contain"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* ✅ Single shared label (same position for flower + square) */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            bottom-0 translate-y-1/4
            z-20
            px-3 sm:px-3 py-2 sm:py-2.5
            rounded-xl
            font-extrabold tracking-wide
            text-[10px] md:text-base
            shadow-sm
            whitespace-nowrap
          "
          style={{ backgroundColor: labelBg, color: labelColor }}
        >
          {labelText}
        </div>

        {/* ✅ Overlay (hover on desktop / tap on mobile) */}
        <div
          className={`
            absolute inset-0 z-30
            flex flex-col items-center justify-between
            rounded-2xl
            bg-white/95
            px-4 py-4 sm:px-5 sm:py-5
            transition-opacity duration-200
            pointer-events-none
            ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          <div className="w-full text-center pt-1">
            <div className="font-extrabold font-more-sugar tracking-wide text-sm sm:text-base">
              {labelText}
            </div>

            <div className="mt-2 text-[11px] sm:text-sm">
              <span className="font-extrabold">Power:</span>{" "}
              <span className="font-medium">{power}</span>
            </div>
          </div>

          <div className="w-full flex justify-center pb-1">
            <Link
              href="/aboutme"
              className="
                pointer-events-auto
                inline-flex items-center justify-center
                px-4 py-2
                rounded-sm sm:rounded-xl
                font-extrabold tracking-wide
                text-[9px] sm:text-sm
                shadow-sm
                focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:ring-offset-2
              "
              style={{ backgroundColor: labelBg, color: labelColor }}
              aria-label={`Enquire Now about ${labelText}`}
              onClick={(e) => e.stopPropagation()}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:ring-offset-2"
        aria-label={labelText}
      >
        {CardInner}
      </Link>
    );
  }

  return CardInner;
}

export default function CharactersScreenMain() {
  return (
    <section className="bg-white">
      {/* Full-width container so cards can reach near the edges */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* 2 columns on mobile, 4 columns on md+; cards fill columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#A3DDD1"
            labelBg="#FFF1E8"
            labelText="BEAUTY QUEEN"
            labelColor="#CE99AD"
            imgSrc={`${basePath}/images/transparentbarbie.png`}
            imgAlt="Barbie character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#BFC2F5"
            maskType="square"
            maskBg="#FFD6CC"
            maskBorder="#FDEFE6"
            labelBg="#FFF2EB"
            labelText="PRINCESS BEAUTY"
            labelColor="#7684CE"
            imgSrc={`${basePath}/images/transparentjasmin.png`}
            imgAlt="Jasmin character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#F4C7CC"
            labelBg="#FFF1E8"
            labelText="MERMAID PRINCESS"
            labelColor="#CE98AE"
            imgSrc={`${basePath}/images/transparentariel.png`}
            imgAlt="Ariel character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#BDE3D8"
            maskType="square"
            maskBg="#98E4B5"
            maskBorder="#FDEFE6"
            labelBg="#FEF1E8"
            labelText="COLOMBIAN PRINCESS"
            labelColor="#729EAB"
            imgSrc={`${basePath}/images/transparentmirabel.png`}
            imgAlt="Mirabel character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#BDE3D8"
            maskType="square"
            maskBg="#98E4B5"
            maskBorder="#FDEFE6"
            labelBg="#FEF1E8"
            labelText="SOUTHERN PRINCESS"
            labelColor="#729EAB"
            imgSrc={`${basePath}/images/transparentmwmheroimage.png`}
            imgAlt="Mirabel character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#F4C7CC"
            labelBg="#FFF1E8"
            labelText="CARIBBEAN MERMAID"
            labelColor="#CE98AE"
            imgSrc={`${basePath}/images/transparentsaboutme.png`}
            imgAlt="Ariel character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#BFC2F5"
            maskType="square"
            maskBg="#FFD6CC"
            maskBorder="#FDEFE6"
            labelBg="#FFF2EB"
            labelText="ARABIAN PRINCESS"
            labelColor="#7684CE"
            imgSrc={`${basePath}/images/transparentjasmine.png`}
            imgAlt="Jasmin character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#A3DDD1"
            labelBg="#FFF1E8"
            labelText="SNOW SISTER"
            labelColor="#CE99AD"
            imgSrc={`${basePath}/images/transparentanna.png`}
            imgAlt="Barbie character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#A3DDD1"
            labelBg="#FFF1E8"
            labelText="SNOW QUEEN"
            labelColor="#CE99AD"
            imgSrc={`${basePath}/images/transparentelsa.png`}
            imgAlt="Barbie character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#BFC2F5"
            maskType="square"
            maskBg="#FFD6CC"
            maskBorder="#FDEFE6"
            labelBg="#FFF2EB"
            labelText="TOWER PRINCESS"
            labelColor="#7684CE"
            imgSrc={`${basePath}/images/transparentrapunzel.png`}
            imgAlt="Jasmin character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#F4C7CC"
            labelBg="#FFF1E8"
            labelText="SPIDER-HERO"
            labelColor="#CE98AE"
            imgSrc={`${basePath}/images/transparentspiderman2.avif`}
            imgAlt="Ariel character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#BDE3D8"
            maskType="square"
            maskBg="#98E4B5"
            maskBorder="#FDEFE6"
            labelBg="#FEF1E8"
            labelText="THE GOOD WITCH"
            labelColor="#729EAB"
            imgSrc={`${basePath}/images/transparentgoodwitch.png`}
            imgAlt="Mirabel character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#BDE3D8"
            maskType="square"
            maskBg="#98E4B5"
            maskBorder="#FDEFE6"
            labelBg="#FEF1E8"
            labelText="POLYNESIAN PRINCESS"
            labelColor="#729EAB"
            imgSrc={`${basePath}/images/transparentmoana.png`}
            imgAlt="Mirabel character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#F4C7CC"
            labelBg="#FFF1E8"
            labelText="QUEEN OF MEAN"
            labelColor="#CE98AE"
            imgSrc={`${basePath}/images/transparentqueenofmean.png`}
            imgAlt="Ariel character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#BFC2F5"
            maskType="square"
            maskBg="#FFD6CC"
            maskBorder="#FDEFE6"
            labelBg="#FFF2EB"
            labelText="MELODY, THE FAIRY PRINCESS"
            labelColor="#7684CE"
            imgSrc={`${basePath}/images/transparentmelody.png`}
            imgAlt="Jasmin character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#A3DDD1"
            labelBg="#FFF1E8"
            labelText="WINNIE THE WITCH"
            labelColor="#CE99AD"
            imgSrc={`${basePath}/images/transparentwinnie.png`}
            imgAlt="Barbie character"
            power="My power is..."
          />
          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#A3DDD1"
            labelBg="#FFF1E8"
            labelText="STARRY PRINCESS"
            labelColor="#CE99AD"
            imgSrc={`${basePath}/images/transparentstarry.png`}
            imgAlt="Barbie character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#BFC2F5"
            maskType="square"
            maskBg="#FFD6CC"
            maskBorder="#FDEFE6"
            labelBg="#FFF2EB"
            labelText="PRINCESS BEAUTY"
            labelColor="#7684CE"
            imgSrc={`${basePath}/images/transparentjasmin.png`}
            imgAlt="Jasmin character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#FDDFDF"
            maskType="flower"
            maskBg="#F4C7CC"
            labelBg="#FFF1E8"
            labelText="ENTERTAINER"
            labelColor="#CE98AE"
            imgSrc={`${basePath}/images/transparentnoncharacter.png`}
            imgAlt="Ariel character"
            power="My power is..."
          />

          <CharacterCard
            boxBg="#BDE3D8"
            maskType="square"
            maskBg="#98E4B5"
            maskBorder="#FDEFE6"
            labelBg="#FEF1E8"
            labelText="MELODY THE ELF"
            labelColor="#729EAB"
            imgSrc={`${basePath}/images/transparentelf.png`}
            imgAlt="Mirabel character"
            power="My power is..."
          />
        </div>
      </div>
    </section>
  );
}
