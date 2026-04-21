import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mubassir Nasar - Portfolio",
  description:
    "This is the portfolio website of Mubassir Nasar. A passionate web developer and designer. and a lifelong learner.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Global dark/light toggle — fixed top-right, always visible */}
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}