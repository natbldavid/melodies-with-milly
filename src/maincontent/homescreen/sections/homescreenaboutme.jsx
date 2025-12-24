import Image from "next/image";
import Link from "next/link";

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.6 6.1L20 12l-6.4 3.9L12 22l-1.6-6.1L4 12l6.4-3.9L12 2z" />
    </svg>
  );
}

/** Flower mask (same approach as your Hero) */
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

const GRAIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
  </filter>
  <rect width="220" height="220" filter="url(#n)" opacity="1"/>
</svg>
`.trim();

const GRAIN_URL = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;

export default function HomeScreenAboutMe() {
  return (
    <section>
      {/* Split: image top on mobile, image right on desktop */}
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex flex-col md:flex-row">
          {/* RIGHT side (on desktop) / TOP (on mobile): IMAGE */}
          <div className="order-1 md:order-2 w-full md:w-1/2 bg-white">
            <div className="px-6 py-10 md:py-14 flex justify-center md:justify-center">
              {/* Flower + decorations container */}
              <div className="relative isolate w-[340px] h-[320px] sm:w-[420px] sm:h-[380px] md:w-[460px] md:h-[420px]">
                {/* Background texture behind the mask */}
<div className="absolute inset-0 z-0 -translate-y-22 md:-translate-y-25 lg:-translate-y-10 scale-100 sm:scale-100 lg:scale-150">
  <Image
    src="/images/transparentwaveimage.png"
    alt=""
    fill
    className="object-cover"
    priority
    opacity="0.5"
  />
  <div
    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
    style={{
      backgroundImage: `url("${GRAIN_URL}")`,
      backgroundRepeat: "repeat",
      backgroundSize: "200px 200px",

      WebkitMaskImage: `url("/images/transparentwaveimage.png")`,
      maskImage: `url("/images/transparentwaveimage.png")`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "cover",
      maskSize: "cover",
      WebkitMaskPosition: "center",
      maskPosition: "center",
    }}
  />
</div>
                {/* Daisy in the middle */}
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 z-20 translate-x-10 sm:translate-x-14 md:translate-x-14 lg:translate-x-16 w-24 h-24 sm:w-28 sm:h-28 md:w-38 md:h-38">
                  <Image
                    src="/images/daisyfloweric.png"
                    alt=""
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Sparkles: top-left */}
                <StarIcon className="absolute -top-6 -left-6 z-20 w-12 h-12 text-[#F3A1CE]" />

                {/* Sparkles: bottom-right */}
                <StarIcon className="absolute -bottom-6 -right-6 z-20 w-12 h-12 text-[#F3A1CE]" />

                {/* Flower-shaped clipped container */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    backgroundColor: "#A4DCD3",
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
                      src="/images/transparentsaboutme.png"
                      alt="About Milly"
                      fill
                      className="object-cover object-[50%_35%]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT side (on desktop) / BOTTOM (on mobile): TEXT */}
          <div className="order-2 md:order-1 w-full md:w-1/2" style={{ backgroundColor: "#FFF1E9" }}>
<div className="px-6 py-10 md:py-14 flex md:items-center md:min-h-[520px]">
  <div className="w-full max-w-xl md:ml-12 lg:ml-16">

                <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
                  ABOUT ME
                </h2>

                <p className="mt-5 text-base sm:text-lg leading-relaxed font-semibold">
                  I first created Melodies with Milly in June 2022. That first year I did over 100
                  parties! I always strive to be the best and ensure the parties I provide are exactly
                  what you want.
                </p>

                <div className="mt-7">
                  <Link
                    href="/aboutme"
                    className="
                      inline-flex items-center justify-center
                      rounded-full
                      px-10 py-3
                      font-extrabold
                      transition-transform hover:scale-[1.02]
                      focus:outline-none focus:ring-2 focus:ring-white/70
                    "
                    style={{ backgroundColor: "#F3A1CE" }}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
