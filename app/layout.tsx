import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
// import Script from "next/script";

const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResuTailor",
  description:
    "ResuTailor helps you craft perfectly tailored resumes by analyzing job descriptions and customizing your resume to match—making you the ideal candidate every time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {/* <Script
          src="/nutrient-viewer/nutrient-viewer.js"
          strategy="beforeInteractive"
        /> */}
        <NavBar />
        <div>
          <Toaster />
        </div>
        <main className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute left-[225px] top-[-40px] w-full h-full">
              <div className="absolute w-[1109px] h-40 left-[-318px] top-[479px] bg-gradient-to-b from-blue-500 to-gray-900 rounded-full blur-[48px]" />
              <div className="absolute w-[1440px] h-40 left-[-129.5px] top-[264.5px] bg-gradient-to-b from-gray-900 to-blue-500 rounded-full blur-[48px]" />
              <div className="absolute w-[1091px] h-40 left-[349px] top-[20px] bg-gradient-to-b from-blue-500 to-blue-500 rounded-full blur-[48px]" />
            </div>
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
