import "./globals.css";
import { Inter_Tight } from "next/font/google";

import ClientLayout from "@/client-layout";

import { ViewTransitions } from "next-view-transitions";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-main",
  display: "swap",
});

export const metadata = {
  title: "Ostra",
  description: "A curated marketplace for digital design assets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={interTight.variable}>
      <body>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
