import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath"; // adjust path if needed

function SparkleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.6 6.1L20 12l-6.4 3.9L12 22l-1.6-6.1L4 12l6.4-3.9L12 2z" />
    </svg>
  );
}

export default function AboutMeScreenMain() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-14 py-14 md:py-20">
        {/* Two columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 md:gap-14">
        {/* LEFT: Layered masked image — centered as a group */}
<div className="flex justify-center md:justify-center">
  <div className="relative flex items-center justify-center">
    {/* Back layer (depth) */}
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
      style={{ backgroundColor: "#EECEFF" }}
      aria-hidden="true"
    />

    {/* Front card */}
    <div
      className="
        relative
        -translate-x-5 md:translate-x-0
        z-20
        w-[280px] h-[280px]
        sm:w-[320px] sm:h-[320px]
        md:w-[300px] md:h-[300px]
        lg:w-[500px] lg:h-[500px]
        overflow-hidden
      "
      style={{ backgroundColor: "#FFDAD1" }}
    >
      {/* Image */}
      <Image
        src={`${basePath}/images/transparentmirabel.png`}
        alt="Milly"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Sparkles INSIDE the card */}
      <SparkleIcon
        className="
          absolute
          top-4 right-4
          w-10 h-10
          text-white
          pointer-events-none
        "
      />
      <SparkleIcon
        className="
          absolute
          bottom-4 left-4
          w-10 h-10
          text-white
          pointer-events-none
        "
      />
    </div>
  </div>
</div>


          {/* RIGHT: Text box */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="
                w-full
                max-w-xl
                md:max-w-none
                md:w-[520px]
                lg:w-[1000px]
                p-8 sm:p-10
              "
              style={{ backgroundColor: "#FFF1E9" }}
            >
              <h2 className="text-#22211E font-extrabold tracking-wide text-3xl sm:text-4xl">
                WHO I AM
              </h2>

              <p className="mt-5 text-#22211E font-semibold text-base sm:text-lg leading-relaxed">
                I first created Melodies with Milly in June 2022. That first year I did over 100
                parties! I always strive to be the best and ensure the parties I provide are EXACTLY
                what you want. I always add my personal touch to every party, ensuring no party is
                the same. </p>
                <p className="mt-5 text-#22211E font-semibold text-base sm:text-lg leading-relaxed">Before starting my party business, I was a nanny and a singing teacher,
                and I worked overseas as an entertainer/vocalist. I have always been passionate
                about singing and teaching, so this business is a dream come true. Aside from my
                career I also love travelling, drinking coffee, spending time with my cats, and Im
                a BIG foodie.
              </p>

              <div className="mt-8">
                <Link
                  href="/home"
                  className="
                    inline-flex items-center justify-center
                    rounded-full
                    px-10 py-3
                    font-extrabold
                    transition-transform hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-black/30
                  "
                  style={{ backgroundColor: "#EBA1BB", color: "#000000" }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
