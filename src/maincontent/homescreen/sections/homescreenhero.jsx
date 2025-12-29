import Image from 'next/image';
import Link from 'next/link';
import { basePath } from "@/lib/basePath";

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.6 6.1L20 12l-6.4 3.9L12 22l-1.6-6.1L4 12l6.4-3.9L12 2z" />
    </svg>
  );
}

function buildFlowerMaskSvg({
  size = 150,        // viewBox width/height
  lobes = 8,         // number of petals/lobes
  baseRadius = 70,   // average radius
  lobeDepth = 12,    // how pronounced the lobes are
  rotation = -Math.PI / 2, // rotate so a lobe points "up"
  steps = 1000        // point resolution; higher = smoother
} = {}) {
  const cx = size / 2;
  const cy = size / 2;

  // Polar flower: r(θ) = baseRadius + lobeDepth * cos(lobes * θ)
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 + rotation;
    const r = baseRadius + lobeDepth * Math.cos(lobes * t);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    pts.push([x, y]);
  }

  const d = pts
    .map(([x, y], idx) => `${idx === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ") + " Z";

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <path d="${d}" fill="white"/>
</svg>
`.trim();
}

// Usage (same mask referencing pattern as you have now)
const FLOWER_MASK_SVG = buildFlowerMaskSvg({
  lobes: 12,        // add an additional lobe here
  baseRadius: 72,
  lobeDepth: 3,
  steps: 480
});

const FLOWER_MASK_URL = `data:image/svg+xml,${encodeURIComponent(FLOWER_MASK_SVG)}`;


export default function HomeScreenHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background + fewer/more organic arcs */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: '#F9CCDB' }}
      >
        {/* Mobile (default: < md) */}
        <svg
          className="absolute inset-0 w-full h-full md:hidden"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 240 980 C 120 620, -540 860, -220 340"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="140"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.9"
          />
          <path
            d="M 1400 -500 C 1300 220, 1500 500, 1500 100"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="150"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
        </svg>

        {/* Tablet (md: >=768 and <1024) */}
        <svg
          className="absolute inset-0 w-full h-full hidden md:block lg:hidden"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 450 1700 C 0 100, -1000 1000, -400 2000"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="150"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
          {/* 2) Starts further right than line 2, mostly vertical with a subtle left drift, exits top */}
          <path
            d="M 820 900 C 820 640, 820 360, 790 230 S 740 70, 720 -140"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="110"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
          {/* 3) Top-right: mostly diagonal, very subtle curve around ~50% down, exits right ~70% down */}
          <path
            d="M 1400 -400 C 1300 220, 1500 500, 1500 300"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="150"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
        </svg>

        {/* Desktop (lg: >=1024) */}
        <svg
          className="absolute inset-0 w-full h-full hidden lg:block"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 400 1000 C 0 100, -1000 1000, -400 2000"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="150"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />

          {/* 2) From bottom (slightly left of center) -> curves -> exits left near top */}
          <path
            d="M 620 1300 C 750 900, 560 420, 500 200 S -1000 210, -300 150"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="110"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
          {/* 3) Starts further right than line 2, mostly vertical with a subtle left drift, exits top */}
          <path
            d="M 820 900 C 820 640, 820 360, 790 230 S 740 70, 720 -140"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="110"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
          {/* 4) Top-right: mostly diagonal, very subtle curve around ~50% down, exits right ~70% down */}
          <path
            d="M 1400 -500 C 1300 220, 1500 500, 1500 700"
            fill="none"
            stroke="#FDBFD6"
            strokeWidth="150"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Image (right on desktop, top on mobile) */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end">
            {/* Wider flower container */}
            <div className="relative isolate w-[360px] h-[300px] sm:w-[440px] sm:h-[360px] md:w-[520px] md:h-[420px]">
              {/* Clean daisy icons (always on top) */}
              <div className="    absolute z-20
    -top-7 right-3
    sm:-top-0 sm:right-10
    md:top-3 md:right-5
    lg:-top-8 lg:right-20
    w-28 h-28
    md:w-28 md:h-28
    lg:w-40 lg:h-40">
                <Image
                  src={`${basePath}/images/daisyfloweric.png`}
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="    absolute z-20
    bottom-0 right-7
    sm:bottom-1 sm:right-8
    md:bottom-7 md:right-7
    lg:bottom-3 lg:right-16
    w-20 h-20
    md:w-20 md:h-20
    lg:w-32 lg:h-32">
                <Image
                  src={`${basePath}/images/daisyfloweric.png`}
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Flower-shaped clipped container (kept below daisies) */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor: '#ABBFFC',
                  WebkitMaskImage: `url("${FLOWER_MASK_URL}")`,
                  maskImage: `url("${FLOWER_MASK_URL}")`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`${basePath}/images/transparentmwmheroimage.png`}
                    alt="Milly"
                    fill
                    className="
                      object-cover
                      object-[70%_31%]
                    "
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
<div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center md:justify-start">
  <div className="relative w-full max-w-lg mx-auto">
    <StarIcon className="absolute -top-6 -left-6 w-12 h-12 text-white/90" />
    <StarIcon className="absolute -bottom-6 -right-6 w-12 h-12 text-white/90" />

<div className="text-white text-center flex flex-col items-center">
  {/* 2) Slightly smaller on small screens */}
  <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
    ENJOY THE
  </p>

  {/* 2) Slightly smaller on small screens */}
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-1">
    BEST PRINCESS PARTIES
  </h1>

  {/* 1) Hide on small screens (show from sm and up) */}
  <p className="hidden sm:block text-lg md:text-xl font-bold mt-3">
    In Greater London, Surrey & Hampshire
  </p>

  {/* 1) Hide on small screens (show from sm and up) */}
  <p className="hidden sm:block text-lg md:text-xl font-bold mt-1">
    At <span className="font-more-sugar text-[#95B3EA]"> Melodies With Milly </span>
  </p>

  {/* 3) Smaller button on small screens */}
  <div className="mt-5 sm:mt-6">
    <Link
      href="/enquiries"
      className="
        inline-flex items-center justify-center rounded-full
        px-12 py-3 text-sm sm:px-20 sm:py-4 sm:text-base
        font-bold text-black transition-transform hover:scale-[1.02]
        focus:outline-none focus:ring-2 focus:ring-white/70
      "
      style={{ backgroundColor: '#FFF1E9' }}
    >
      Enquiries
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
