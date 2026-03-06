"use client";

import { useState } from "react";

import PackagesScreenHero from "./sections/packagesscreenhero";
import PackagesScreenMain from "./sections/packagesscreenmain";
import PackageOneEntertainerScreen from "./sections/packagesoneentertainer";
import PackageTwoEntertainerScreen from "./sections/packagestwoentertainer";
import PackageVirtualEntertainerScreen from "./sections/packagesvirtualentertainer";

export default function PackagesScreen() {
  // Add new keys here as you build more screens:
  // "main" | "one-entertainer" | "two-entertainer" | "virtual"
  const [activeView, setActiveView] = useState("main");

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  return (
    <div>
      <PackagesScreenHero />

      {activeView === "main" && (
        <PackagesScreenMain onNavigate={handleNavigate} />
      )}

      {activeView === "one-entertainer" && (
        <PackageOneEntertainerScreen onBack={() => handleNavigate("main")} />
      )}

      {activeView === "two-entertainer" && (
        <PackageTwoEntertainerScreen onBack={() => handleNavigate("main")} />
      )}

      {activeView === "virtual-entertainer" && (
        <PackageVirtualEntertainerScreen onBack={() => handleNavigate("main")} />
      )}

    </div>
  );
}
