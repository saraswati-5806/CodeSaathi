import "./globals.css";
import SiteNav from "../components/SiteNav";
export const metadata={title:"CodeSaathi - AI Powered LMS",description:"AI-Powered LMS and Online Coding Platform"};
export default function RootLayout({children}){return <html lang="en"><body><SiteNav/>{children}</body></html>}
