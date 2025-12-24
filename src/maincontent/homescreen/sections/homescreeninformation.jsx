import Link from "next/link";

function InfoCard({ emoji, title, children }) {
  return (
    <div
      className="
        bg-white shadow-sm
        p-6
        text-center
        h-full
      "
    >
      <div className="text-4xl leading-none mb-4" style={{ color: "#EBA1BB" }}>
        {emoji}
      </div>

      <h3 className="font-extrabold text-lg mb-2 text-[#2D2D2D]">{title}</h3>

      <div className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function HomeScreenInformation() {
  return (
    <section style={{ backgroundColor: "#EBA1BB" }}>
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* 2x2 on mobile, 4 across on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <InfoCard emoji="👑" title="Princess fun">
            Unique Princess party experiences for your little ones to enjoy with their favourite characters.
          </InfoCard>

          <InfoCard emoji="😊" title="Raving reviews">
            Join the hundreds of others that have had a brilliant party with Melodies With Milly.
          </InfoCard>

          <InfoCard emoji="📍" title="Many locations">
            Elevate your parties in{" "}
            <Link href="/aboutme" className="font-bold underline underline-offset-2 text-[#EBA1BB]">
              Surrey
            </Link>
            ,{" "}
            <Link href="/aboutme" className="font-bold underline underline-offset-2 text-[#EBA1BB]">
              Hampshire
            </Link>{" "}
            &{" "}
            <Link href="/aboutme" className="font-bold underline underline-offset-2 text-[#EBA1BB]">
              South-West London
            </Link>
            .
          </InfoCard>

          <InfoCard emoji="✨" title="Magical Moments">
            Our customisable princess packages, professional team, and local charm make every moment magical.
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
