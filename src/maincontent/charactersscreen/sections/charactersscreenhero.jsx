import Image from "next/image";
import { basePath } from "@/lib/basePath";

function SparkleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l1.6 6.1L20 12l-6.4 3.9L12 22l-1.6-6.1L4 12l6.4-3.9L12 2z" />
    </svg>
  );
}

function MaskCard({ imageSrc, tiltClass = "", children }) {
  return (
    <div className={`relative ${tiltClass}`}>
      {children}

      <div
        className="
          relative
          w-[100px] h-[100px]
          sm:w-[100px] sm:h-[100px]
          md:w-[200px] md:h-[200px]
          lg:w-[340px] lg:h-[340px]
          rounded-[34px]
          border-[7px]
          overflow-hidden
          shadow-md
        "
        style={{
          backgroundColor: "#B5EDC8",
          borderColor: "#FFF1E8",
        }}
      >
        <Image
          src={imageSrc}
          alt="Children’s party princess entertainer smiling in costume"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}

export default function CharactersScreenHero() {
  return (
    <section style={{ backgroundColor: "#D2C1F6" }}>
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-14 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-14 md:gap-10">
          
          {/* LEFT IMAGE */}
          <div className="hidden md:flex justify-center md:justify-end pr-6">
            <MaskCard imageSrc={`${basePath}/images/caribbean-mermaid-princess-party-entertainer.avif`}>
              <div className="pointer-events-none">
                <div className="absolute -top-7 -left-7 z-10 w-24 h-24 lg:w-30 h-30">
                  <Image
                    src={`${basePath}/images/daisyfloweric.avif`}
                    alt=""
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute -bottom-7 -right-7 z-10 w-24 h-24 lg:w-30 h-30">
                  <Image
                    src={`${basePath}/images/daisyfloweric.avif`}
                    alt=""
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </MaskCard>
          </div>

          {/* CENTER */}
          <div className="text-center">
 {/* Mobile row */}
 <div className="md:hidden relative flex flex-col items-center justify-center mb-6">
   {/* Left Fixed Image */}
   <div className="absolute left-0 top-1/2 -translate-y-1/2">
     <MaskCard imageSrc={`${basePath}/images/caribbean-mermaid-princess-party-entertainer.avif`}>
       <div className="pointer-events-none">
         <div className="absolute -top-4 -left-4 z-10 w-12 h-12">
           <Image
             src={`${basePath}/images/daisyfloweric.avif`}
             alt=""
             fill
             className="object-contain"
             priority
           />
         </div>
         <div className="absolute -bottom-4 -right-4 z-10 w-12 h-12">
           <Image
             src={`${basePath}/images/daisyfloweric.avif`}
             alt=""
             fill
             className="object-contain"
             priority
           />
         </div>
       </div>
     </MaskCard>
   </div>
 
   {/* Center Text */}
   <h2 className="text-white font-extrabold font-more-sugar tracking-wide text-3xl sm:text-5xl z-10">
     <span className="block">THE</span>
   <span className="block">CREW</span>
   </h2>
 
   {/* Right Fixed Image */}
   <div className="absolute right-0 top-1/2 -translate-y-1/2">
     <MaskCard imageSrc={`${basePath}/images/southern-princess-party-entertainer.avif`}>
       <SparkleIcon className="absolute -top-5 left-1/2 translate-x-4 z-10 w-10 h-10 text-white" />
       <SparkleIcon className="absolute -bottom-5 left-1/2 -translate-x-13 z-10 w-10 h-10 text-white" />
     </MaskCard>
   </div>
 </div>

            {/* Medium only: md */}
<h2 className="hidden sm:hidden md:block lg:hidden text-white font-extrabold font-more-sugar tracking-wide leading-none text-5xl">
  THE CREW
</h2>

{/* Desktop: lg+ */}
<h2 className="hidden lg:block text-white font-extrabold font-more-sugar tracking-wide leading-none text-5xl lg:text-6xl">
  CHARACTERS
</h2>

            <p className="mt-6 text-white font-bold text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Explore our amazing characters and pick the perfect one for your party!
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:flex justify-center md:justify-start pl-6">
            <MaskCard
              imageSrc={`${basePath}/images/southern-princess-party-entertainer.avif`}
             /* tiltClass="-rotate-6" */
            >
              <SparkleIcon className="absolute -top-9 left-1/2 translate-x-12 w-16 h-16 lg:translate-x-30 z-10 lg:w-24 h-24 text-white" />
              <SparkleIcon className="absolute -bottom-9 left-1/2 -translate-x-32 w-16 h-16 lg:-translate-x-48 z-10 lg:w-24 h-24 text-white" />
            </MaskCard>
          </div>
        </div>
      </div>
    </section>
  );
}
