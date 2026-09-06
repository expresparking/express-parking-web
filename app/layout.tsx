import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ArrowIcon } from "./ui";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Express Parking & Mobility | Parking Made Simple", template: "%s | Express Parking & Mobility" },
  description: "Professional parking garages, surface lots, valet, event parking, property care, and premium car-care amenities for Connecticut properties.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="site-header">
          <div className="shell nav-wrap">
            <Link className="brand" href="/" aria-label="Express Parking home">
              <img className="brand-x" src="/images/express-x-logo.png" alt="" />
              <span><b>EXPRESS</b><small>PARKING &amp; MOBILITY</small></span>
            </Link>
            <nav aria-label="Primary navigation">
              <Link href="/find-parking">Find Parking</Link>
              <Link href="/parking-management">Parking</Link>
              <Link href="/property-care">Property Care</Link>
              <Link href="/velor">Car Care</Link>
              <Link href="/approach">Our approach</Link>
              <Link href="/about">Company</Link>
            </nav>
            <details className="mobile-menu">
              <summary>Menu</summary>
              <div><Link href="/find-parking">Find Parking</Link><Link href="/parking-management">Parking</Link><Link href="/property-care">Property Care</Link><Link href="/property-care/report">Report an Issue</Link><Link href="/velor">Car Care</Link><Link href="/approach">Our approach</Link><Link href="/about">Company</Link><Link href="/contact">Contact</Link></div>
            </details>
            <Link className="nav-cta" href="/contact">Partner with Express Parking: Request a Proposal <ArrowIcon /></Link>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="shell footer-grid">
            <div>
              <Link className="brand brand-light" href="/">
                <img className="brand-x" src="/images/express-x-logo.png" alt="" />
                <span><b>EXPRESS</b><small>PARKING &amp; MOBILITY</small></span>
              </Link>
              <p>Parking solutions, property care, mobility services, and premium customer experiences from one accountable local team.</p>
            </div>
            <div><h3>Parking</h3><Link href="/find-parking">Daily parking</Link><Link href="/find-parking">Monthly parking</Link><Link href="/parking-management">Garages</Link><Link href="/parking-management">Surface lots</Link></div>
            <div><h3>Services</h3><Link href="/property-care">Property Care</Link><Link href="/property-care/report">Report an Issue</Link><Link href="/services/parking-ambassadors">Parking Ambassadors</Link><Link href="/velor">Velor Car Care</Link></div>
            <div><h3>Company</h3><Link href="/about">About</Link><Link href="/contact">Careers</Link><Link href="/contact">Contact</Link><Link href="/contact">Request proposal</Link><a href="tel:+12039410954">203-941-0954</a></div>
          </div>
          <div className="shell footer-bottom"><span>© 2026 Express Parking. All rights reserved.</span><span>Parking, property care &amp; mobility services for Connecticut.</span></div>
        </footer>
      </body>
    </html>
  );
}
