import Link from "next/link";

function PackageInfoCard({ href, title, features = [], price }) {
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
          h-full
          rounded-2xl
          bg-white
          border border-black/10
          shadow-sm
          overflow-hidden
          transition-transform duration-200
          group-hover:-translate-y-0.5
        "
      >
        {/* Use flex-col so we can pin the price to the bottom */}
        <div className="h-full p-6 sm:p-7 flex flex-col">
          {/* Title */}
          <h3 className="text-black font-extrabold text-xl sm:text-2xl">
            {title}
          </h3>

          {/* Features */}
          <ul className="mt-4 space-y-2 list-disc pl-5 text-black/80 text-base sm:text-[1.05rem]">
            {features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          {/* Price pinned to bottom */}
          <div className="mt-auto pt-6">
            <p className="text-black font-extrabold text-lg sm:text-xl">
              {price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function PackageOneEntertainerScreen() {
  return (
    <section>
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-center font-extrabold tracking-wide text-3xl sm:text-4xl">
          ONE ENTERTAINER PACKAGES
        </h2>

        {/* 1 column on small, 2 columns on large+ */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <PackageInfoCard
            href="/enquiries"
            title="Bronze 30 min party"
            features={[
              "Party games",
              "A song from the chosen entertainer",
              "A gift for the birthday child",
              "And more...",
            ]}
            price="From £90"
          />

          <PackageInfoCard
            href="/enquiries"
            title="Silver 1hr Party"
            features={[
              "Party games",
              "A song from the chosen entertainer",
              "Pass the parcel",
              "Bubbles",
              "And more...",
            ]}
            price="From £145"
          />

          <PackageInfoCard
            href="/enquiries"
            title="Gold 90 min Party"
            features={[
              "Party games",
              "A song from the chosen entertainer",
              "Pass the parcel",
              "Bubbles",
              "Crafts",
              "And more...",
            ]}
            price="From £175"
          />

          <PackageInfoCard
            href="/enquiries"
            title="Diamond 2hr Party"
            features={[
              "Party games",
              "A song from the chosen entertainer",
              "Pass the parcel",
              "Bubbles",
              "Crafts",
              "Snack break",
              "Tattoos",
              "Glitter",
              "And more..."
            ]}
            price="From £200"
          />
        </div>
      </div>
    </section>
  );
}