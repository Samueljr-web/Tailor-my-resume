// import Image from "next/image";

import HeroSection from "@/features/landing/heroSection";
import HowItWorks from "@/features/landing/howItWorks";
// import NavBar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <NavBar /> */}
      <HeroSection />
      <HowItWorks />
    </div>
  );
}
