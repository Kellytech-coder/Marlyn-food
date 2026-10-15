import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/site-chrome";
import SiteFooter from "./components/site-footer";

export const metadata: Metadata = {
  title: "Marlyn - Goodness, grown daily",
  description: "Thoughtfully sourced beans and flour for the meals that bring everyone home.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body className="min-h-full flex flex-col"><SiteChrome />{children}<SiteFooter /></body></html>;
}
