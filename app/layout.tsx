import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Steam Games Rank Builder",
  description: "Ranking application for Steam accounts games.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <PageHeader />
          <div className="page-content">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
