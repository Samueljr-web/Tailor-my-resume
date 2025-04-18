import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/navbar";
// import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Script
          src="/nutrient-viewer/nutrient-viewer.js"
          strategy="beforeInteractive"
        /> */}
        <NavBar />
        <div>
          <Toaster />
        </div>

        {children}
      </body>
    </html>
  );
}
