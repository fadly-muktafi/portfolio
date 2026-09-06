import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-sg",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TODO(owner): confirm final domain before launch
  metadataBase: new URL("https://fadlymuktafi.vercel.app"),
  title: "Fadly Muktafi | Software Engineer",
  description:
    "Portfolio of Fadly Muktafi, a fullstack software engineer from Jakarta building reliable web products, from database to interface.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Fadly Muktafi | Software Engineer",
    description:
      "Fullstack software engineer from Jakarta. Internship experience across enterprise and foundation projects.",
    // TODO(M7): add /og.png (1200x630) before launch
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Accent Playground persistence: restore hue before first paint.
            Pattern: nextjs docs "preventing flash before hydration". */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var h=localStorage.getItem("fm-accent-h");if(h!==null)document.documentElement.style.setProperty("--accent-h",h)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-dvh bg-bg font-display text-text">
        {/* Blueprint grid, global bottom layer (Visual-System §6) */}
        <div
          aria-hidden
          className="grid-lines pointer-events-none fixed inset-0 -z-10"
        />
        {children}
        {/* Film grain, global top layer (z-70, inert) */}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
