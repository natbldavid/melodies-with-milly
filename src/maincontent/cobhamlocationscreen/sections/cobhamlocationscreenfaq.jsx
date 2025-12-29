"use client";

import { useMemo, useState } from "react";

export default function FarnhamFAQ() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = useMemo(
    () => [
      {
        q: "How do I book a party for my child?",
        a: "Head over to the enquiry page and fill out the form. If you have any issues, feel free to email or private message us on our social media accounts.",
      },
      {
        q: "What areas do you cover?",
        a: "We are based in Surrey and Hampshire. We work within a 10 mile radius of where each entertainer is based. Any further is an extra 50p fee per mile.",
      },
      {
        q: "Is there a limit to how many children can attend a party?",
        a: "We use 1 entertainer for 14 children. Any more than 14 children incurs a charge of £30 for an assistant. The limit is 30 children, however we always recommend smaller parties, as this works better for crafts, games, etc. We also advise limited adult attendance.",
      },
      {
        q: "What age group is suitable for a party?",
        a: "The parties have no age limit, but we usually cover parties for children from ages 1-8.",
      },
      {
        q: "Do you supply venue and decorations, etc.?",
        a: "No, we only supply the entertainers, our party equipment and the sound equipment.",
      },
      {
        q: "Do you provide music and sound equipment?",
        a: "Yes, we have bluetooth speakers which cover an indoor area with around 20 children, or we have a large sound system with a microphone that can be used to entertain 50+ guests.",
      },
      {
        q: "Do you provide packages will multiple princesses?",
        a: "Yes! Head over to the enquiry page and fill out a form. We will email back everything you need to know.",
      },
      {
        q: "Can I customize the party activities and games?",
        a: "Of course! If you would like to change or include anything in particular, please just let us know and we are happy to do so. ",
      },
      {
        q: "Do I have to pay a deposit?",
        a: "Yes, you will pay a small deposit of around £40-50 depending on the party package, and then on the week of the party you will be required to pay the remaining balance. The deposit is non-refundable.",
      },
      {
        q: "Can I arrange a phone call to plan my childs party?",
        a: "Yes of course! I'm able to answer any questions you have whenever I'm available. I always make sure to schedule a call with the parent/guardian the week of the event, to make sure the party format is perfect and we have everything planned for.",
      },
      {
        q: "Where can I learn more about careers at Melodies With Milly?",
        a: "You can email me at Melodieswithmilly@gmail.com with the subject title ‘Entertainer Role’ and I will be sure to email you back all the necessary info.",
      },
    ],
    []
  );

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  return (
    <section className="bg-white">
      {/* Narrower container + more breathing room from edges */}
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-10 py-10 md:py-14">
        {/* Header row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1
            className="text-center lg:text-left text-xl sm:text-2xl md:text-3xl font-normal tracking-wide"
            style={{ color: "#94A4F9" }}
          >
            Frequently asked questions
          </h1>

          {/* Search (mobile: under title, desktop: right of title) */}
          <div className="w-full lg:w-[280px]">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpenIndex(null);
                }}
                placeholder="Looking for something"
                className="
                  w-full bg-transparent
                  pr-10 pb-2
                  text-sm sm:text-base
                  outline-none
                  placeholder:font-bold
                "
                style={{
                  color: "#94A4F9",
                  borderBottom: "1px solid #94A4F9",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottom = "1px solid #7E90F2";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottom = "1px solid #94A4F9";
                }}
                aria-label="Search FAQs"
              />

              {/* Magnifying glass */}
              <span className="absolute right-0 top-0 h-full flex items-center pr-2 pointer-events-none">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94A4F9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* FAQ list */}
        <div className="mt-15">
          {filteredFaqs.length === 0 ? (
            <div
              className="text-center text-sm sm:text-base"
              style={{ color: "#94A4F9" }}
            >
              No results found.
              <div
                className="mt-3"
                style={{ height: 1, background: "#94A4F9" }}
              />
            </div>
          ) : (
            <div>
              {filteredFaqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={`${item.q}-${idx}`} className="select-none">
                    <button
                      type="button"
                      className="w-full text-left flex items-center justify-between gap-4 py-4"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-base sm:text-xl md:text-2xl"
                        style={{ color: "#94A4F9" }}
                      >
                        {item.q}
                      </span>

                      {/* Chevron */}
                      <span
                        className="flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#94A4F9"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 200ms ease",
                          }}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pb-4">
                        <p
                          className="text-sm sm:text-base leading-relaxed"
                          style={{ color: "#94A4F9" }}
                        >
                          {item.a}
                        </p>
                      </div>
                    )}

                    {/* Separator line (thin + consistent) */}
                    <div style={{ height: 0.4, background: "#94A4F9" }} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
