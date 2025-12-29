import Link from "next/link";
import Image from "next/image";

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="site-footer" style={{ backgroundColor: "#9CA9F9" }} className="mt-auto">
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-8 py-12">
        {/* 3 sections: stacked on mobile, 3 columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* LEFT: MENU */}
          <div className="text-white">
            <h3 className="font-extrabold tracking-wide text-xl">MENU</h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link href="/home" className="font-semibold hover:opacity-80 transition-opacity">
                HOME
              </Link>
              <Link href="/aboutme" className="font-semibold hover:opacity-80 transition-opacity">
                ABOUT
              </Link>
                <Link href="/characters" className="font-semibold hover:opacity-80 transition-opacity">
                CHARACTERS
              </Link>
                <Link href="/enquiries" className="font-semibold hover:opacity-80 transition-opacity">
                ENQUIRIES
              </Link>
            </nav>
          </div>

          {/* MIDDLE: LOGO + DISCLAIMER */}
          <div className="text-white md:text-center">
            <div className="font-extrabold flex md:justify-center text-2xl">
            MELODIES WITH MILLY
            </div>

            <p className="mt-4 text-sm leading-relaxed opacity-95">
              Disclaimer: Our characters are based upon well-known and loved fairytales and have no
              affiliation to any other trademarks or companies
            </p>

            <p className="mt-4 text-sm font-semibold opacity-95">©2023 by Melodies With Milly.</p>
          </div>

          {/* RIGHT: SOCIAL + EMAIL */}
          <div className="text-white md:text-right">
            <h3 className="font-extrabold tracking-wide text-xl">GET SOCIAL</h3>

            <div className="mt-4 flex md:justify-end items-center gap-5">
              {/* Facebook */}
              <SocialIcon href="https://facebook.com" label="Facebook">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>

              {/* Instagram */}
              <SocialIcon href="https://instagram.com" label="Instagram">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>

              {/* TikTok */}
              <SocialIcon href="https://tiktok.com" label="TikTok">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.65 1c.27 2.24 1.58 4.02 3.73 5.03v3.64c-1.96.12-3.66-.52-5.16-1.55v7.36c0 4.5-3.87 8.15-8.63 7.46-3.1-.46-5.66-2.9-6.06-6.01C.03 13.2 3.83 9.5 8.5 9.5c.37 0 .73.03 1.08.1v3.98c-.33-.1-.69-.16-1.08-.16-1.94 0-3.49 1.6-3.28 3.57.14 1.32 1.22 2.4 2.54 2.54 1.97.21 3.57-1.34 3.57-3.28V1h4.32z" />
                </svg>
              </SocialIcon>
            </div>
            <div className="mt-4">
            <Link href="/faqs" className="font-semibold hover:opacity-80 transition-opacity">
                FAQs
              </Link>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
