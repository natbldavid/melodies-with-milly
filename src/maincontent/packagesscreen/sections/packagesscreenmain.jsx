import Link from "next/link";

export default function PackagesScreenMain() {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-3">Coming Soon.</h1>
      <p className="text-gray-500">
        Please come back later to view the packages.
      </p>
      <p className="text-gray-500"> For any queries, please use the enquiries form. </p>
      <div className="py-7">
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
  );
}
