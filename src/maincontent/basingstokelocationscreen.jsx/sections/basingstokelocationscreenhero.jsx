import Image from "next/image";

export default function FAQScreenHero() {
  return (
    <section style={{ backgroundColor: "#D2C1F6" }}>
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-14 py-14 md:py-20">
        <div className="items-center gap-14 md:gap-10">
          {/* CENTER */}
          <div className="text-center">
 {/* Mobile row */}
 <div className="md:hidden relative flex flex-col items-center justify-center mb-6">
 
   {/* Center Text */}
   <h2 className="text-white font-extrabold font-more-sugar tracking-wide text-3xl sm:text-5xl z-10">
     <span className="block">PRINCESS PARTIES - BASINGSTOKE</span>
   </h2>
 </div>

            {/* Medium only: md */}
<h2 className="hidden sm:hidden md:block lg:hidden text-white font-extrabold font-more-sugar tracking-wide leading-none text-5xl">
  PRINCESS PARTIES - BASINGSTOKE
</h2>

{/* Desktop: lg+ */}
<h2 className="hidden lg:block text-white font-extrabold font-more-sugar tracking-wide leading-none text-5xl lg:text-6xl">
  PRINCESS PARTIES - BASINGSTOKE
</h2>

            <p className="mt-6 text-white font-bold text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Deliver the magic of royal celebrations to Basingstoke for your little prince or princess!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}