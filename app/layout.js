import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Auto-README.AI",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation */}
        <nav className="bg-black w-full px-6 py-6">
          <div className="relative flex items-center">
            <Image
              src="/Auto-README.png"
              alt="Auto-README.AI Logo"
              width={100}
              height={100}
            />
            <span className="absolute left-1/2 -translate-x-1/2 text-white text-5xl font-semibold">
              Auto-README.AI
            </span>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
