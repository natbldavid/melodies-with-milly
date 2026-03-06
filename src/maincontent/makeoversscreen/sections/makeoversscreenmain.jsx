import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath";

function SparkleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.6 6.1L20 12l-6.4 3.9L12 22l-1.6-6.1L4 12l6.4-3.9L12 2z" />
    </svg>
  );
}

export default function MakeoversScreenMain() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-14 py-14 md:py-20">
        {/* Desktop: 2 columns. Mobile: stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 md:gap-14">
          {/* LEFT: Two-image collage */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[560px]">
              {/* Depth layers */}
              <div
                className="absolute -top-6 left-6 h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px]"
                style={{ backgroundColor: "#EECEFF" }}
                aria-hidden="true"
              />
              <div
                className="absolute top-10 -left-3 h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] lg:h-[320px] lg:w-[320px]"
                style={{ backgroundColor: "#FFDAD1" }}
                aria-hidden="true"
              />

              {/* Hero portrait card */}
              <div
                className="
                  relative z-20 overflow-hidden
                  w-[280px] sm:w-[340px] lg:w-[420px]
                  aspect-[3/4]
                  shadow-sm
                "
                style={{ backgroundColor: "#FFF1E9" }}
              >
                <Image
                  src={`${basePath}/images/entertainer-face-makeover-princess.avif`}
                  alt="Princess makeover moment"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <SparkleIcon className="absolute top-4 right-4 w-10 h-10 text-white pointer-events-none" />
              </div>

              {/* Secondary landscape card (overlapping) */}
              <div
                className="
                  absolute z-30
                  -bottom-10 sm:-bottom-12
                  right-0 sm:right-2
                  w-[240px] sm:w-[300px] lg:w-[360px]
                  aspect-[4/3]
                  overflow-hidden
                  shadow-sm
                "
                style={{ backgroundColor: "#EECEFF" }}
              >
                <Image
                  src={`${basePath}/images/entertainer-lip-makeover-princess.avif`}
                  alt="Finished princess makeover look"
                  fill
                  className="object-cover object-center"
                />
                <SparkleIcon className="absolute bottom-4 left-4 w-10 h-10 text-white pointer-events-none" />
              </div>

              {/* Spacer so the overlap doesn’t collide with next section on mobile */}
              <div className="h-16 sm:h-20" aria-hidden="true" />
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
              <h2 className="text-#22211E font-extrabold font-more-sugar tracking-wide text-3xl sm:text-4xl">
                LITTLE PRINCESS MAKEOVERS
              </h2>

              {/* If you truly have “a lot” of text, break it into scannable chunks */}
              <div className="mt-5 space-y-5 text-#22211E font-semibold text-base sm:text-base leading-relaxed">
                <p>
                  {/* paragraph 1 */}
                  Little Princess Makeovers are the best add on to the Ultimate Princess Party! </p> <p>A pamper session with the character of your choice and child-friendly makeup! Truly nothing better!
                </p>
                <p>
                  {/* paragraph 2 */}
                  Whats included:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Glitter</li>
                  <li>Lipstick</li>
                  <li>Eyeshadow</li>
                  <li>Temp tattoos</li>
                  <li>Face paint with patterned stencils</li>
                </ul>
                <p>
                    Price for Little Princess Makeovers
                </p>
                <p>
                    £55 for up to 14 children
                </p>
                <p>
                    Can we add more children to the package?
                </p>
                <p>
                    Yes, absolutely! It is £3.50 per extra child.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/enquiries"
                  className="
                    inline-flex items-center justify-center
                    rounded-full px-10 py-3
                    font-extrabold
                    transition-transform hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-black/30
                  "
                  style={{ backgroundColor: "#EBA1BB", color: "#000000" }}
                >
                  Enquire Now
                </Link>

                {/* Optional secondary CTA */}
                <Link
                  href="/packages"
                  className="
                    inline-flex items-center justify-center
                    rounded-full px-10 py-3
                    font-extrabold
                    border
                    transition-transform hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-black/30
                  "
                  style={{ borderColor: "#EBA1BB", color: "#000000" }}
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
