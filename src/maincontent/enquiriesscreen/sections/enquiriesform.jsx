"use client";

import { useMemo, useState } from "react";
// import Link from "next/link"; // Not used; safe to remove.

const FORM_ENDPOINT = "https://formspree.io/f/xeeokarn";

const CHARACTER_OPTIONS = [
  "Unsure",
  "Ice Queen",
  "Polynesian Princess",
  "Princess Beauty",
  "Snow Sister",
  "Colombian Princess",
  "Spider-Hero",
  "Tower Princess",
  "Starry Princess",
  "Beauty Queen",
  "Mermaid Princess",
  "Melody, the Fairy Princess",
  "Caribbean Mermaid",
  "Arabian Princess",
  "Southern Princess",
  "Queen of Mean",
  "Melody, the Elf",
  "Winnie, the Witch",
  "Non-Character Entertainer",
  "Two Entertainers",
  "Not sure / Undecided",
];

const PACKAGE_OPTIONS = [
  "Unsure",
  "Bronze 30 min",
  "Silver 1hr",
  "Gold 90 min",
  "Diamond 2hr",
  "Virtual Package",
  "Not sure / Undecided",
];

const PARKING_OPTIONS = ["Unsure", "Yes", "No"];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  character: "Unsure",
  package: "Unsure",
  childrenCount: "",
  date: "",
  time: "",
  location: "",
  parking: "Unsure",
  message: "",
};

export default function EnquiriesForm() {
  const [form, setForm] = useState(initialFormState);

  // Submission UI state
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"
  const [submitError, setSubmitError] = useState("");

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const isFormValid = useMemo(() => {
    const requiredText = ["name", "email", "phone", "location", "message"];
    const requiredOther = ["character", "package", "childrenCount", "date", "time", "parking"];

    const textOk = requiredText.every((k) => String(form[k]).trim().length > 0);
    const otherOk = requiredOther.every((k) => String(form[k]).trim().length > 0);

    const count = Number(form.childrenCount);
    const childrenOk =
      Number.isFinite(count) && form.childrenCount !== "" && count >= 0 && Number.isInteger(count);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    return textOk && otherOk && childrenOk && emailOk;
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitError("");

    if (!isFormValid || submitting) return;

    try {
      setSubmitting(true);

      // Send as JSON to Formspree (recommended for controlled React forms)
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Include a subject so the email is easy to identify
          subject: "New party enquiry",

          // IMPORTANT: keep `email` field named exactly `email` so Formspree can set Reply-To.
          name: form.name,
          email: form.email,
          phone: form.phone,
          character: form.character,
          package: form.package,
          childrenCount: form.childrenCount,
          date: form.date,
          time: form.time,
          location: form.location,
          parking: form.parking,
          message: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Formspree typically returns { errors: [{ message: "..." }, ...] }
        const msg =
          data?.errors?.map((er) => er?.message).filter(Boolean).join(" ") ||
          "Something went wrong. Please try again.";
        throw new Error(msg);
      }

      setSubmitStatus("success");
      setForm(initialFormState);
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Optional: success screen
  if (submitStatus === "success") {
    return (
      <section className="bg-white">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div
            className="rounded-2xl p-6 sm:p-8 shadow-sm border bg-white"
            style={{ borderColor: "rgba(118,132,206,0.25)" }}
          >
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-[#5E5A98]">
              Thank you
            </h2>
            <p className="mt-2 text-sm text-[#6E6AA8]">
              Your enquiry has been sent. We’ll get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitStatus(null)}
              className="mt-6 rounded-xl px-5 py-3 font-extrabold tracking-wide text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:ring-offset-2 hover:opacity-95"
              style={{
                background:
                  "linear-gradient(90deg, rgba(145,160,247,0.95), rgba(206,153,173,0.95), rgba(118,132,206,0.95))",
                color: "#ffffff",
              }}
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Top notice */}
        <p className="text-center text-sm sm:text-base font-medium text-[#6E6AA8]">
          Use our enquiries form to get more information for your party.
        </p>

        {/* Main two-column layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:items-start">
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

            {/* Status messages */}
            {submitStatus === "error" && (
              <div
                className="mt-4 rounded-xl border px-4 py-3 text-sm"
                style={{
                  borderColor: "rgba(206,153,173,0.35)",
                  backgroundColor: "rgba(253,223,223,0.35)",
                  color: "#5E5A98",
                }}
              >
                <div className="font-extrabold">Could not send your enquiry.</div>
                <div className="mt-1">{submitError}</div>
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {/* Hidden subject (shows in the email subject line on many setups) */}
              <input type="hidden" name="subject" value="New party enquiry" />

              {/* Name */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#7684CE]">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={update("name")}
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
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#CE99AD]">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={update("email")}
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
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#729EAB]">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={update("phone")}
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
                  required
                />
              </div>

              {/* Character */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#7684CE]">
                  Character
                </label>
                <select
                  name="character"
                  value={form.character}
                  onChange={update("character")}
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(118,132,206,0.25)",
                    backgroundColor: "rgba(255,242,235,0.45)",
                  }}
                  required
                >
                  {CHARACTER_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Package */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#CE99AD]">
                  Package
                </label>
                <select
                  name="package"
                  value={form.package}
                  onChange={update("package")}
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(206,153,173,0.25)",
                    backgroundColor: "rgba(253,223,223,0.35)",
                  }}
                  required
                >
                  {PACKAGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of children */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#729EAB]">
                  Number of children
                </label>
                <input
                  name="childrenCount"
                  value={form.childrenCount}
                  onChange={update("childrenCount")}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  placeholder="e.g. 12"
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98] placeholder:text-[#9A97C7]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(114,158,171,0.25)",
                    backgroundColor: "rgba(189,227,216,0.25)",
                  }}
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#7684CE]">
                  Date
                </label>
                <input
                  name="date"
                  value={form.date}
                  onChange={update("date")}
                  type="date"
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(118,132,206,0.25)",
                    backgroundColor: "rgba(255,242,235,0.45)",
                  }}
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#CE99AD]">
                  Time
                </label>
                <input
                  name="time"
                  value={form.time}
                  onChange={update("time")}
                  type="time"
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(206,153,173,0.25)",
                    backgroundColor: "rgba(253,223,223,0.35)",
                  }}
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#729EAB]">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={update("location")}
                  type="text"
                  placeholder="Party address / venue (postcode helpful)"
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98] placeholder:text-[#9A97C7]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(114,158,171,0.25)",
                    backgroundColor: "rgba(189,227,216,0.25)",
                  }}
                  required
                />
              </div>

              {/* Parking */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#7684CE]">
                  Is parking available?
                </label>
                <select
                  name="parking"
                  value={form.parking}
                  onChange={update("parking")}
                  className="
                    mt-2 w-full rounded-xl border px-4 py-3
                    text-sm text-[#5E5A98]
                    focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:border-transparent
                  "
                  style={{
                    borderColor: "rgba(118,132,206,0.25)",
                    backgroundColor: "rgba(255,242,235,0.45)",
                  }}
                  required
                >
                  {PARKING_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-[#7684CE]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update("message")}
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
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className="
                  w-full rounded-xl py-3
                  font-extrabold tracking-wide text-sm
                  shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:ring-offset-2
                  hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed
                "
                style={{
                  background:
                    "linear-gradient(90deg, rgba(145,160,247,0.95), rgba(206,153,173,0.95), rgba(118,132,206,0.95))",
                  color: "#ffffff",
                }}
              >
                {submitting ? "SENDING..." : "SEND"}
              </button>
            </form>

            {/* Small helper text */}
            <p className="mt-3 text-xs text-[#6E6AA8]">
              By submitting, you consent to being contacted regarding your enquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
