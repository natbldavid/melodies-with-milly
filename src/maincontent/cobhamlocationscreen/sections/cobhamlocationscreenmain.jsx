// locationscreenmain.jsx
import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath"; // keep if you're using basePath elsewhere

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.6 6.1L20 12l-6.4 3.9L12 22l-1.6-6.1L4 12l6.4-3.9L12 2z" />
    </svg>
  );
}

/** Flower mask (copied approach from HomeScreenAboutMe) */
function buildFlowerMaskSvg({
  size = 160,
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
    pts.map(([x, y], idx) => `${idx === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ") +
    " Z";

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <path d="${d}" fill="white"/>
</svg>
`.trim();
}

const FLOWER_MASK_SVG = buildFlowerMaskSvg();
const FLOWER_MASK_URL = `data:image/svg+xml,${encodeURIComponent(FLOWER_MASK_SVG)}`;

const GRAIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
  </filter>
  <rect width="220" height="220" filter="url(#n)" opacity="1"/>
</svg>
`.trim();

const GRAIN_URL = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;

function MaskedImageFlower({
  src,
  alt,
  bgColor = "#A4DCD3",
  showDecor = true,
  className = "",
  objectClassName = "object-cover object-center",
}) {
  return (
    <div
      className={`relative isolate w-[340px] h-[320px] sm:w-[420px] sm:h-[380px] md:w-[460px] md:h-[420px] ${className}`}
    >
      {/* Optional texture behind the mask (same structure as your HomeScreenAboutMe) */}
      <div className="absolute inset-0 z-0 -translate-y-10 scale-100 sm:scale-100 lg:scale-125">
        <Image
          src={`${basePath}/images/transparentwaveimage.png`}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: `url("${GRAIN_URL}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            WebkitMaskImage: `url("${basePath}/images/transparentwaveimage.png")`,
            maskImage: `url("${basePath}/images/transparentwaveimage.png")`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            maskSize: "cover",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>

      {showDecor && (
        <>
          {/* Daisy + sparkles (optional, keeps the “home” aesthetic) */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 z-20 translate-x-10 sm:translate-x-14 md:translate-x-14 lg:translate-x-16 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36">
            <Image
              src={`${basePath}/images/daisyfloweric.png`}
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          <StarIcon className="absolute -top-6 -left-6 z-20 w-12 h-12 text-[#F3A1CE]" />
          <StarIcon className="absolute -bottom-6 -right-6 z-20 w-12 h-12 text-[#F3A1CE]" />
        </>
      )}

      {/* Flower-shaped clipped container */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: bgColor,
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
          <Image src={src} alt={alt} fill className={objectClassName} priority />
        </div>
      </div>
    </div>
  );
}

/** Simple square mask option (for your “square mask too” request) */
function MaskedImageSquare({
  src,
  alt,
  bgColor = "#FFDAD1",
  className = "",
  objectClassName = "object-cover object-center",
}) {
  return (
    <div
      className={`relative w-[340px] h-[320px] sm:w-[420px] sm:h-[380px] md:w-[460px] md:h-[420px] overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <Image src={src} alt={alt} fill className={objectClassName} priority />
    </div>
  );
}

/** “Shadow/depth mask effect” inspired by your About screen */
function MaskedImageShadowCard({
  src,
  alt,
  backColor = "#EECEFF",
  frontColor = "#FFDAD1",
  className = "",
  objectClassName = "object-cover object-center",
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Back layer */}
      <div
        className="
          absolute
          translate-x-5
          -translate-y-6
          w-[280px] h-[280px]
          sm:w-[320px] sm:h-[320px]
          md:w-[300px] md:h-[300px]
          lg:w-[500px] lg:h-[500px]
        "
        style={{ backgroundColor: backColor }}
        aria-hidden="true"
      />

      {/* Front card */}
      <div
        className="
          relative
          z-10
          w-[280px] h-[280px]
          sm:w-[320px] sm:h-[320px]
          md:w-[300px] md:h-[300px]
          lg:w-[500px] lg:h-[500px]
          overflow-hidden
        "
        style={{ backgroundColor: frontColor }}
      >
        <Image src={src} alt={alt} fill className={objectClassName} priority />
      </div>
    </div>
  );
}

function LocationSection({
  title,
  body,
  imageSrc,
  imageAlt,
  flip = false,
  variant = "flower", // "flower" | "square" | "shadow"
}) {
  const ImageBlock =
    variant === "shadow" ? (
      <MaskedImageShadowCard src={imageSrc} alt={imageAlt} />
    ) : variant === "square" ? (
      <MaskedImageSquare src={imageSrc} alt={imageAlt} />
    ) : (
      <MaskedImageFlower src={imageSrc} alt={imageAlt} />
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-14">
      {/* Image */}
      <div className={`${flip ? "order-1 lg:order-2" : "order-1"} flex justify-center`}>
        {ImageBlock}
      </div>

      {/* Text */}
      <div className={`${flip ? "order-2 lg:order-1" : "order-2"} flex justify-center lg:justify-start`}>
        <div
          className="
            w-full max-w-xl
            rounded-xl
            bg-[#FFF1E9]
            px-6 py-7
            sm:px-8 sm:py-8
          "
        >
          <h3 className="text-[#95B3EA] font-extrabold font-more-sugar tracking-wide text-2xl sm:text-4xl">
            {title}
          </h3>

          <p className="mt-4 text-[#22211E] font-semibold text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {body}
          </p>
                    {/* Middle button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/enquiries" // adjust if your enquiry route differs
              className="
                inline-flex items-center justify-center
                rounded-full
                px-10 py-3
                font-extrabold
                transition-transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-black/30
              "
              style={{ backgroundColor: "#F3A1CE", color: "#000000" }}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default function LocationScreenMain() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-14 py-8 md:py-10">
        {/* Top intro */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="mt-5 text-[#22211E] font-semibold text-base sm:text-lg leading-relaxed">
Are you looking to host a magical princess party in Cobham? At Melodies with Milly, we specialise in bringing fairytale wonder to life through our unique princess character parties. With a wide selection of packages to choose from, we can customise an enchanting experience tailored just for your very own little prince or princess.
          </p>

          {/* Middle button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact" // adjust if your enquiry route differs
              className="
                inline-flex items-center justify-center
                rounded-full
                px-10 py-3
                font-extrabold
                transition-transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-black/30
              "
              style={{ backgroundColor: "#F3A1CE", color: "#000000" }}
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* Three alternating sections */}
        <div className="mt-14 md:mt-18 space-y-16 md:space-y-20">
          <LocationSection
            title={<>Princess Entertainers For Kids Parties in <span className="text-[#F9B1C5]"> Cobham </span></>}
            body="Searching for an entertainer to truly bring your child's favourite princess character to life?

Our talented performers at Melodies with Milly are specially trained to embody the magic, personality, and charm of each role.

From the icy elegance of Our Ice Queen to Our Mermaid Princess, our entertainers fully commit to the character through elaborate costumes, spot-on mannerisms, fantastic singing voices and movie-accurate looks. They engage the children with storytelling, singalongs, and interactive games.

We have a broad selection of princess and character packages to suit events of any size and age group in Cobham. Our entertainers captivate with their acting talent and energetic presence, ensuring your party is fun, memorable + truly magical!"
            imageSrc={`${basePath}/images/transparentmirabel.png`}
            imageAlt="Location section one"
            flip={false}
            variant="shadow" // requested: “shadow” style like About screen
          />

          <LocationSection
            title={<>Find a Princess For a Party in <span className="text-[#F9B1C5]">Cobham </span></>}
            body="As a top provider of princess entertainers and character appearances in Surrey, we offer an enchanting selection of fairytale favourites.

From Disney-inspired princesses like Mirabel and Rapunzel to Frozen's beloved Elsa or The Arabian Princess Jasmine, your child can meet their most-adored character brought vividly to life. 

Offering fully bespoke party packages, we work closely with you to understand your child's unique interests, crafting a bespoke party experience that fires their imagination."
            imageSrc={`${basePath}/images/transparentariel.png`}
            imageAlt="Location section two"
            flip={true}
            variant="flower" // requested: flower mask like HomeScreenAboutMe
          />

          <LocationSection
            title={<>Princess Party Entertainment <span className="text-[#F9B1C5]">Cobham </span></>}
            body="Seeking one-of-a-kind princess party entertainment in Cobham? Melodies with Milly offers interactive character experiences that bring fairytales wondrously to life. From delightful singalongs and spooky potions to themed arts, crafts, and games, we create a whimsical celebration tailored especially for your child.


Children will be swept away as their preferred Disney-inspired princess comes alive before their eyes! We also provide sound equipment and specialty party add-ons so you can craft a distinctive event on any budget.

​

As one of Surrey and London’s top-rated character party providers, Melodies with Milly has delivered the magic of dreamy princess celebrations to countless events in Cobham and surrounding areas. We offer flexible packages and pricing, working closely with you to make your child's event a truly unforgettable experience!"
            imageSrc={`${basePath}/images/transparentsaboutme.png`}
            imageAlt="Location section three"
            flip={false}
            variant="square" // requested: include a square mask option too
          />
        </div>
      </div>
    </section>
  );
}
