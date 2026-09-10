import { Suspense } from "react";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { GithubContributions } from "@/components/ui/github-contributions";
import { a11y } from "@/lib/content";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-chip focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-accent-ink"
      >
        {a11y.skipToContent}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact
          githubSlot={
            <Suspense fallback={null}>
              <GithubContributions />
            </Suspense>
          }
        />
      </main>
      <Footer />
    </>
  );
}
