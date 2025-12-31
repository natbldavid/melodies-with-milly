"use client";

import Link from "next/link";

export default function EnquiriesForm() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Top notice */}
        <p className="text-center text-sm sm:text-base font-medium text-[#6E6AA8]">
          Use our enquiries form to get more information for your party. However, if you
          wish to make a booking, please use our{" "}
          <Link
            href="/aboutme"
            className="font-extrabold underline underline-offset-4 text-[#7684CE] hover:text-[#91A0F7]"
          >
            bookings form
          </Link>
          .
        </p>

        {/* Main two-column layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* LEFT: Contact info */}
          <div
            className="rounded-2xl p-6 sm:p-8 shadow-sm border"
            style={{
              background:
                "linear-gradient(135deg, rgba(191,194,245,0.55), rgba(253,223,223,0.55), rgba(189,227,216,0.45))",
              borderColor: "rgba(118,132,206,0.25)",
            }}
          >
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-[#5E5A98]">
              Get in Contact
            </h2>

            <div className="mt-5 space-y-4 text-[#5E5A98]">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(255,241,232,0.9)" }}
                  aria-hidden="true"
                >
                  {/* Phone icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#7684CE]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.25 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-[#7684CE]">
                    Phone
                  </div>
                  <div className="font-semibold">07825180222</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(255,241,232,0.9)" }}
                  aria-hidden="true"
                >
                  {/* Mail icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#CE99AD]"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-[#CE99AD]">
                    Email
                  </div>
                  <div className="font-semibold">melodieswithmilly@gmail.com</div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wide text-[#729EAB]">
                  Socials
                </div>
                <div className="mt-3 flex items-center gap-3">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/melodieswithmilly"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm border hover:opacity-90"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.85)",
                      borderColor: "rgba(114,158,171,0.25)",
                    }}
                    aria-label="Facebook"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-[#7684CE]"
                    >
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15.9c-1.2 0-1.6.7-1.6 1.5V12H17l-.5 3h-2.2v7A10 10 0 0 0 22 12Z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/melodieswithmilly/"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm border hover:opacity-90"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.85)",
                      borderColor: "rgba(206,153,173,0.25)",
                    }}
                    aria-label="Instagram"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#CE99AD]"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@melodieswithmilly"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm border hover:opacity-90"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.85)",
                      borderColor: "rgba(118,132,206,0.25)",
                    }}
                    aria-label="TikTok"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-[#5E5A98]"
                    >
                      <path d="M16.5 3c.6 3.4 2.8 5.5 6 5.8V12c-2.2-.1-4.1-.8-6-2v7.1c0 4-3.2 6.9-7.2 6.9-4.1 0-7.3-3.1-7.3-7.1S5.2 10 9.3 10c.5 0 1 .1 1.5.2v3.6c-.5-.2-1-.4-1.6-.4-2 0-3.6 1.7-3.6 3.7S7.2 21 9.2 21s3.7-1.5 3.7-4.1V3h3.6Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Enquiries form */}
          <div
            className="rounded-2xl p-6 sm:p-8 shadow-sm border bg-white"
            style={{ borderColor: "rgba(118,132,206,0.25)" }}
          >
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-[#5E5A98]">
              Enquiries Form
            </h2>
            <p className="mt-2 text-sm text-[#6E6AA8]">
              Send us a message and we’ll get back to you.
            </p>

            <form className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#7684CE]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98] placeholder:text-[#9A97C7]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(118,132,206,0.25)",
                    backgroundColor: "rgba(255,242,235,0.45)",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#CE99AD]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98] placeholder:text-[#9A97C7]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(206,153,173,0.25)",
                    backgroundColor: "rgba(253,223,223,0.35)",
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#729EAB]">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Your phone number"
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98] placeholder:text-[#9A97C7]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(114,158,171,0.25)",
                    backgroundColor: "rgba(189,227,216,0.25)",
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#7684CE]">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your party..."
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98] placeholder:text-[#9A97C7]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                    resize-none
                  "
                  style={{
                    borderColor: "rgba(118,132,206,0.25)",
                    backgroundColor: "rgba(255,242,235,0.45)",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                className="
                  w-full rounded-xl py-3
                  font-extrabold tracking-wide text-sm
                  shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:ring-offset-2
                  hover:opacity-95
                "
                style={{
                  background:
                    "linear-gradient(90deg, rgba(145,160,247,0.95), rgba(206,153,173,0.95), rgba(118,132,206,0.95))",
                  color: "#ffffff",
                }}
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
