"use client";

import { useState } from "react";
import { skills } from "@/lib/content";
import { Reveal } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const STORAGE_KEY = "fm-accent-h";
const DEFAULT_HUE = 140;

function nearestPresetName(hue: number): string {
  const hit = skills.playground.presets.find((p) => p.hue === hue);
  return hit ? hit.name : "Custom";
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-40"
    >
      <SectionHeading numeral={skills.numeral} title={skills.title} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Accent Playground */}
        <Reveal className="lg:col-span-5">
          <Playground />
        </Reveal>

        {/* Skill groups */}
        <div className="space-y-8 lg:col-span-7">
          {skills.groups.map((group, gi) => (
            <Reveal key={group.label} delay={0.05 * gi}>
              <p className="mb-3 font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="glass rounded-chip px-3 py-1.5 font-mono text-[13px] text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <p className="mb-3 font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
              {skills.softLabel}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {skills.soft.map((s) => (
                <li
                  key={s}
                  className="font-mono text-xs tracking-[0.12em] text-text-secondary uppercase"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Playground() {
  const [hue, setHue] = useState(DEFAULT_HUE);

  function apply(value: number) {
    setHue(value);
    document.documentElement.style.setProperty("--accent-h", String(value));
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      /* storage unavailable: session-only is fine (UX-Blueprint §9) */
    }
  }

  return (
    <div className="glass sticky top-28 rounded-card p-6 md:p-8">
      <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
        [ {skills.playground.label} ]
      </p>
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {skills.playground.hint}
      </p>

      <div className="mt-6">
        <label htmlFor="hue-slider" className="sr-only">
          {skills.playground.liveValue}
        </label>
        <input
          id="hue-slider"
          type="range"
          min={0}
          max={360}
          step={1}
          value={hue}
          onChange={(e) => apply(Number(e.target.value))}
          aria-label="Accent hue"
          className="hue-slider w-full"
        />
        <div className="mt-3 flex items-baseline justify-between font-mono text-xs text-text-secondary">
          <span className="tracking-[0.12em] uppercase">
            {nearestPresetName(hue)}
          </span>
          <span className="text-accent tabular-nums">{hue}°</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {skills.playground.presets.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => apply(preset.hue)}
            aria-label={`Preset ${preset.name}`}
            aria-pressed={hue === preset.hue}
            title={preset.name}
            className={`h-8 w-8 rounded-full border transition-transform duration-150 hover:scale-110 active:scale-95 ${
              hue === preset.hue ? "border-text" : "border-line"
            }`}
            style={{
              backgroundColor: `oklch(0.84 0.12 ${preset.hue})`,
            }}
          />
        ))}
        <button
          type="button"
          onClick={() => apply(DEFAULT_HUE)}
          className="ml-auto font-mono text-xs tracking-[0.12em] text-text-muted uppercase transition-colors hover:text-accent"
        >
          {skills.playground.reset}
        </button>
      </div>
    </div>
  );
}
