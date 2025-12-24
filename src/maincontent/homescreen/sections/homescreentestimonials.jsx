import React from "react";

function StarIcon({ className, fill }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function StarRating({ value = 5 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < value);

  return (
    <div className="mt-3 flex items-center justify-center gap-1">
      {stars.map((filled, idx) => (
        <StarIcon
          key={idx}
          className="w-8 h-8"
          fill={filled ? "#9CA9F9" : "#D9D9D9"}
        />
      ))}
    </div>
  );
}


function TestimonialCard({ text, name, stars = 5 }) {
  return (
    <div className="bg-white shadow-sm p-6 h-full flex flex-col">
      <p className="text-sm sm:text-base leading-relaxed flex-1">
        {text}
      </p>

      <p className="mt-5 font-extrabold">{name}</p>

      <StarRating value={stars} />
    </div>
  );
}

export default function HomeScreenTestimonials() {
  return (
    <section style={{ backgroundColor: "#EBA1BB" }}>
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
          WHAT OUR CUSTOMERS SAY
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <TestimonialCard
            text="Milly made our daughters 3rd birthday so special! I know even some of the Mums felt emotional listening to her sing. She is in an incredibly good singer, performer and entertainer!"
            name="Chenese Mead"
            stars={5}
          />

          <TestimonialCard
            text="Milly is so amazing, the children adore her as she's so engaging and makes any activity super fun we will 100% be booking her again and I would highly recommend her."
            name="Holly Nuttal (Lazer Lions)"
            stars={5}
          />

          <TestimonialCard
            text="Our son asked for a Moana party and Milly not only delivered but smashed it out of the park! The kids are still talking about Moana and the party! She managed to keep 10 2-4yr olds engaged and excited for the entire time."
            name="Lynsey Hart"
            stars={5}
          />
        </div>
      </div>
    </section>
  );
}
