import Link from "next/link";
import Image from "next/image";
import { basePath } from "@/lib/basePath";

function SquiggleDivider() {
  // A simple vertical wavy SVG that scales to the card height
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 200"
      preserveAspectRatio="none"
      className="h-full w-6"
    >
      <path
        d="M12 0
           C6 10, 18 20, 12 30
           C6 40, 18 50, 12 60
           C6 70, 18 80, 12 90
           C6 100, 18 110, 12 120
           C6 130, 18 140, 12 150
           C6 160, 18 170, 12 180
           C6 190, 18 195, 12 200"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PackageInfoCard({
  href,
  title,
  features = [],
  price,
  // pastel background for right side
  pastelClass = "bg-emerald-100",
  // transparent PNG/WebP in /public
  imageSrc = "",
  imageAlt = "",
  mobileImageScale = "scale-100",
  mobileFit = "cover",
}) {
  return (
    <Link
      href={href}
      className="
        group block w-full h-full
        focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-[#C9CAF8]
      "
      aria-label={title}
    >
      <div
        className="
          relative h-full
          rounded-2xl
          border border-black/10
          shadow-sm
          overflow-hidden
          transition-transform duration-200
          group-hover:-translate-y-0.5
          bg-white
        "
      >
        {/* Two-panel layout */}
        <div className="relative h-full">
          {/* LEFT: text content */}
          <div className="p-6 bg-[#f7f6f0] sm:p-7 flex flex-col">
            <h3 className="text-black font-extrabold text-xl sm:text-2xl">
              {title}
            </h3>

            <ul className="mt-4 space-y-2 list-disc pl-5 text-black/80 text-base sm:text-lg">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <p className="text-black font-extrabold text-lg sm:text-xl">
                {price}
              </p>
            </div>
          </div>

    

            {/* optional: soft highlight */}
            <div className="pointer-events-none absolute inset-0 bg-white/10" />
          </div>
      </div>
    </Link>
  );
}

export default function PackageOneEntertainerScreen({ onBack }) {
  return (
    <section>
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 font-bold text-black underline underline-offset-4 decoration-black/40 transition-colors transition-decoration duration-200 hover:text-violet-400 hover:decoration-violet-400 cursor-pointer"
        >
           ← Back to Packages
        </button>
        <h2 className="text-center font-extrabold tracking-wide text-3xl sm:text-4xl">
          VIRTUAL PACKAGES
        </h2>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <PackageInfoCard
            href="/enquiries"
            title="Royal Video Message"
            features={[
              "Personalised video message from a princess of your choice.",
              "Have a hello and a fun call with your favourite princess. They love saying hello!",
            ]}
            price="From £15"
            pastelClass="bg-emerald-100"
            imageSrc={`${basePath}/images/virtual-package-princess.avif`}
            imageAlt=""
          />

          <PackageInfoCard
            href="/enquiries"
            title="Festive Video Message"
            features={[
              "Personalised message from Melody, The Elf - £10",
              "Christmas greeting from Father Christmas AND Melody, The Elf personalised message - £15",
            ]}
            price="From £10"
            pastelClass="bg-yellow-100"
            imageSrc={`${basePath}/images/virtual-package-elf-princess.avif`}
            imageAlt=""
          />

        </div>
      </div>
    </section>
  );
}
