'use client';

import Link from 'next/link';
import Image from 'next/image';
import { basePath } from "@/lib/basePath";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  const isActive = (href) => pathname === href;

useEffect(() => {
  if (!isMenuOpen) return;

  // Save current scroll position
  const scrollY = window.scrollY;

  // Lock body in place without causing layout jump
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";

  return () => {
    // Restore scroll position
    const y = Math.abs(parseInt(document.body.style.top || "0", 10)) || 0;

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    window.scrollTo(0, y);
  };
}, [isMenuOpen]);


useEffect(() => {
  const navEl = document.getElementById('site-navbar');
  const footerEl = document.getElementById('site-footer');

  // If footer isn't in the DOM yet, do nothing this render.
  // Next render it will exist (layout renders Footer after Navbar).
  if (!navEl || !footerEl) return;

  // Start from the current React state so we don't "flash" incorrectly
  let navInView = true;
  let footerInView = false;

  const computeShouldShow = () => !navInView && !footerInView && !isMenuOpen;

  const navObserver = new IntersectionObserver(
    ([entry]) => {
      navInView = entry.isIntersecting;
      setShowFloatingMenu(computeShouldShow());
    },
    { threshold: 0 }
  );

  const footerObserver = new IntersectionObserver(
    ([entry]) => {
      footerInView = entry.isIntersecting;
      setShowFloatingMenu(computeShouldShow());
    },
    { threshold: 0 }
  );

  navObserver.observe(navEl);
  footerObserver.observe(footerEl);

  // Initial calculation should happen via callbacks; do not setState directly here.

  return () => {
    navObserver.disconnect();
    footerObserver.disconnect();
  };
}, [isMenuOpen]);


  return (
    <nav id="site-navbar" className="w-full shadow-sm">
      {/* Top white bar with logo (desktop + mobile) */}
      <div className="relative h-[10vh] md:h-[15vh] bg-white border-b border-gray-200 flex items-center px-4 md:px-0">
        {/* Absolutely centered logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
<div className="relative w-23 h-23 md:w-32 md:h-32">
  <Image
    src={`${basePath}/images/mwmlogoofficial.avif`}
    alt="Children's Parties logo"
    fill
    className="object-contain"
    priority
  />
</div>
        </div>

        {/* Mobile hamburger (right side) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden ml-auto p-2 rounded-md text-[#91A0F7] focus:outline-none focus:ring-2 focus:ring-[#91A0F7] focus:ring-offset-2"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="#91A0F7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop nav bar (blue) */}
      <div className="hidden md:flex h-[5vh] items-center justify-center bg-[#91A0F7]">
        <div className="flex space-x-10">
          <Link
            href="/home"
            className={`text-white font-bold pb-1 ${
              isActive('/home') ? 'border-b-2 border-white' : 'hover:text-blue-100'
            }`}
          >
            HOME
          </Link>
          <Link
            href="/aboutme"
            className={`text-white font-bold pb-1 ${
              isActive('/aboutme') ? 'border-b-2 border-white' : 'hover:text-blue-100'
            }`}
          >
            ABOUT
          </Link>
          <Link
          href="/characters"
          className={`text-white font-bold pb-1 ${
            isActive('/characters') ? 'border-b-2 border-white' : 'hover:text-blue-100'
        }`}
        >
            CHARACTERS
            </Link>
                      <Link
          href="/enquiries"
          className={`text-white font-bold pb-1 ${
            isActive('/enquiries') ? 'border-b-2 border-white' : 'hover:text-blue-100'
        }`}
        >
            ENQUIRIES
            </Link>
                <Link
          href="/packages"
          className={`text-white font-bold pb-1 ${
            isActive('/packages') ? 'border-b-2 border-white' : 'hover:text-blue-100'
        }`}
        >
            PACKAGES
            </Link>
        </div>
      </div>

      {/* Mobile full-screen overlay menu */}
<div
  className={`md:hidden fixed top-0 left-0 right-0 bottom-0 w-screen overflow-x-hidden z-50 transition-opacity duration-300 ${
    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
  }`}
  aria-hidden={!isMenuOpen}
>
<div
  className={`absolute top-0 left-0 right-0 bottom-0 w-screen transition-transform duration-300 ${
    isMenuOpen ? 'translate-y-0' : '-translate-y-2'
  }`}
  style={{ backgroundColor: '#FFF1E9' }}
>
          {/* 3-row layout: top (close), middle (links), bottom (social) */}
          <div className="h-full grid grid-rows-[auto,1fr,auto]">
            {/* Top row: close */}
            <div className="flex items-center justify-end p-5">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9CA9F9] focus:ring-offset-2"
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="#9CA9F9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Middle row: centered nav links */}
            <div className="flex items-center justify-center px-8">
              <div className="flex flex-col items-center gap-8 text-center">
                <Link
                  href="/home"
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-semibold tracking-tight text-4xl sm:text-5xl ${
                    isActive('/home') ? 'text-[#EBA1BB]' : 'text-[#9CA9F9]'
                  }`}
                >
                  HOME
                </Link>

                <Link
                  href="/aboutme"
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-semibold tracking-tight text-4xl sm:text-5xl ${
                    isActive('/aboutme') ? 'text-[#EBA1BB]' : 'text-[#9CA9F9]'
                  }`}
                >
                  ABOUT
                </Link>
                <Link
                href="/characters"
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold tracking-tight text-4xl sm:text-5xl ${
                isActive('/characters') ? 'text-[#EBA1BB]' : 'text-[#9CA9F9]'
}`}
>
    CHARACTERS
</Link>
                <Link
                href="/enquiries"
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold tracking-tight text-4xl sm:text-5xl ${
                isActive('/enquiries') ? 'text-[#EBA1BB]' : 'text-[#9CA9F9]'
}`}
>
    ENQUIRIES
</Link>
                <Link
                href="/packages"
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold tracking-tight text-4xl sm:text-5xl ${
                isActive('/packages') ? 'text-[#EBA1BB]' : 'text-[#9CA9F9]'
}`}
>
    PACKAGES
</Link>
              </div>
            </div>

            {/* Bottom row: social icons */}
            <div className="px-8 pb-8">
              <div className="flex items-center justify-center gap-8" style={{ color: '#9CA9F9' }}>
                <a
                  href="https://www.facebook.com/melodieswithmilly"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/melodieswithmilly/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@melodieswithmilly"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.65 1c.27 2.24 1.58 4.02 3.73 5.03v3.64c-1.96.12-3.66-.52-5.16-1.55v7.36c0 4.5-3.87 8.15-8.63 7.46-3.1-.46-5.66-2.9-6.06-6.01C.03 13.2 3.83 9.5 8.5 9.5c.37 0 .73.03 1.08.1v3.98c-.33-.1-.69-.16-1.08-.16-1.94 0-3.49 1.6-3.28 3.57.14 1.32 1.22 2.4 2.54 2.54 1.97.21 3.57-1.34 3.57-3.28V1h4.32z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* ✅ ADDED: Floating circular logo button (mobile only) */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation menu"
        className={`
          md:hidden
          fixed bottom-5 right-5 z-40
          h-16 w-16 rounded-full
          shadow-xl
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-white/70
          ${showFloatingMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{ backgroundColor: '#fff' }}
      >
        <span className="relative block h-full w-full">
          <Image
            src={`${basePath}/images/company-logo-official-small.avif`}
            alt=""
            fill
            className="object-contain p-2"
            priority={false}
          />
        </span>
      </button>
    </nav>
  );
}
