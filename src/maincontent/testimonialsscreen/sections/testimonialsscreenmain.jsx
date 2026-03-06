"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { testimonials } from "./testimonialsdata"; // <- adjust path if needed

// ---------- Stars ----------
function StarIcon({ className, fill = "currentColor", stroke = "none" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={fill}
      stroke={stroke}
      strokeWidth={stroke === "none" ? 0 : 2}
    >
      <path d="M12 2l2.6 7.3L22 9.6l-5.8 4.2L18.3 22 12 17.9 5.7 22l2.1-8.2L2 9.6l7.4-0.3L12 2z" />
    </svg>
  );
}

/**
 * Renders 5 stars with fractional fill:
 * - full: solid yellow
 * - partial: yellow fill clipped to fraction, with yellow outline
 * - empty: transparent fill, yellow outline
 */
function StarRating({ value, sizeClass = "w-5 h-5" }) {
  const clamped = Math.max(0, Math.min(5, value));
  const full = Math.floor(clamped);
  const frac = clamped - full;

  return (
    <div className="flex items-center gap-1" aria-label={`${clamped} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const isFull = idx <= full;
        const isPartial = idx === full + 1 && frac > 0;

        if (isFull) {
          return <StarIcon key={i} className={`${sizeClass} text-yellow-400`} />;
        }

        if (isPartial) {
          // Outline star + clipped fill star
          return (
            <span key={i} className={`relative inline-block ${sizeClass}`}>
              <StarIcon
                className={`${sizeClass} text-yellow-400`}
                fill="transparent"
                stroke="currentColor"
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${Math.round(frac * 100)}%` }}
                aria-hidden="true"
              >
                <StarIcon className={`${sizeClass} text-yellow-400`} />
              </span>
            </span>
          );
        }

        return (
          <StarIcon
            key={i}
            className={`${sizeClass} text-yellow-400`}
            fill="transparent"
            stroke="currentColor"
          />
        );
      })}
    </div>
  );
}

// ---------- Helpers ----------
function computeStats(items) {
  const count = items.length;
  const sum = items.reduce((acc, t) => acc + (Number(t.rating) || 0), 0);
  const average = count ? sum / count : 0;

  // Counts for 1..5 (assuming integer ratings in your data)
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  items.forEach((t) => {
    const r = Math.round(Number(t.rating) || 0);
    if (r >= 1 && r <= 5) counts[r] += 1;
  });

  const maxCount = Math.max(...Object.values(counts), 0);

  return { count, average, counts, maxCount };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ---------- Screen ----------
export default function TestimonialsScreenMain() {
  const [visibleCount, setVisibleCount] = useState(3);

  const stats = useMemo(() => computeStats(testimonials), []);
  const avg1dp = useMemo(() => Number(stats.average.toFixed(1)), [stats.average]);

  const shown = useMemo(() => testimonials.slice(0, visibleCount), [visibleCount]);
  const canShowMore = visibleCount < testimonials.length;
  const canShowLess = visibleCount > 3;

  const handleShowMore = () => setVisibleCount((c) => clamp(c + 3, 3, testimonials.length));
  const handleShowLess = () => setVisibleCount((c) => clamp(c - 3, 3, testimonials.length));

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-14 py-14 md:py-20">
        {/* Title */}
        <div className="flex justify-center">
          <h2 className="text-#22211E font-extrabold font-more-sugar tracking-wide text-3xl sm:text-4xl text-center">
            What Our Customers Say
          </h2>
        </div>

        {/* Stats */}
        <div className="mt-10">
          {/* Desktop: left + right, Mobile: stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-10">
            {/* LEFT (desktop) / TOP (mobile): average */}
            <div className="flex flex-col items-start lg:items-start">
              <div className="text-#22211E font-extrabold text-5xl leading-none">
                {avg1dp}
              </div>

              <div className="mt-3">
                <StarRating value={stats.average} sizeClass="w-6 h-6" />
              </div>

              <div className="mt-2 text-sm text-black/60 font-semibold">
                {stats.count} ratings
              </div>
            </div>

            {/* RIGHT: distribution bars */}
            <div
              className="w-full p-6 sm:p-8"
            >
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((r) => {
                  const c = stats.counts[r] ?? 0;
                  const pct = stats.maxCount ? (c / stats.maxCount) * 100 : 0;

                  return (
                    <div key={r} className="flex items-center gap-4">
                      {/* Bar */}
                      <div className="flex-1">
                        <div className="h-3 w-full rounded-full bg-black/10 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: "#7C3AED" // purple fill
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Label on right */}
                      <div className="w-[120px] text-right">
                        <div className="text-sm font-extrabold text-#22211E">
                          {r}.0
                        </div>
                        <div className="text-xs font-semibold text-black/60">
                          {c} ratings
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shown.map((t, idx) => (
            <article
              key={`${t.name}-${t.date}-${idx}`}
              className="p-6 sm:p-7 shadow-sm"
              style={{ backgroundColor: "#FFF1E9" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={t.image}
                      alt={`${t.name} testimonial`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="font-extrabold text-#22211E truncate">
                      {t.name}
                    </div>
                    <div className="text-sm font-semibold text-black/50">
                      {t.date}
                    </div>
                  </div>
                </div>

                {/* Rating (right) */}
                <div className="text-right shrink-0">
                  <div className="font-extrabold text-#22211E">{t.rating}.0</div>
                  <div className="mt-1 flex justify-end">
                    <StarRating value={t.rating} sizeClass="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 text-#22211E font-semibold leading-relaxed">
                {t.description}
              </p>
            </article>
          ))}
        </div>

        {/* View more / less */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {canShowMore && (
            <button
              type="button"
              onClick={handleShowMore}
              className="
                inline-flex items-center justify-center
                rounded-full px-10 py-3
                font-extrabold
                transition-transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-black/30
              "
              style={{ backgroundColor: "#EBA1BB", color: "#000000" }}
            >
              View More...
            </button>
          )}

          {canShowLess && (
            <button
              type="button"
              onClick={handleShowLess}
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
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
