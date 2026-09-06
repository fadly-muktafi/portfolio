"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Copy, PaperPlaneTilt } from "@phosphor-icons/react";
import { contact, site } from "@/lib/content";
import { Reveal } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Magnetic } from "@/components/fx/magnetic";

type Status = "idle" | "sending" | "sent" | "error";
type Toast = { id: number; message: string } | null;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<Toast>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();

  function showToast(message: string) {
    setToast({ id: Date.now(), message });
    setTimeout(() => setToast(null), 3000);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    /* Client-side pre-validation (server validates again with zod) */
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = contact.form.errors.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = contact.form.errors.email;
    if (data.message.trim().length < 10)
      errs.message = "At least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      showToast(contact.form.toast.success);
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      showToast(contact.form.toast.error);
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      showToast(contact.direct.toastCopied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(site.email); /* clipboard denied: show the address (UX-Blueprint §9) */
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-40"
    >
      <SectionHeading numeral={contact.numeral} title={contact.title} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Form */}
        <Reveal>
          <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
            {/* Honeypot: invisible to humans */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <Field
              label={contact.form.fields.name}
              name="name"
              type="text"
              error={errors.name}
              autoComplete="name"
            />
            <Field
              label={contact.form.fields.email}
              name="email"
              type="email"
              error={errors.email}
              autoComplete="email"
            />
            <Field
              label={contact.form.fields.subject}
              name="subject"
              type="text"
            />
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs tracking-[0.12em] text-text-secondary uppercase"
              >
                {contact.form.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full resize-y rounded-chip border border-line bg-bg-elevated px-4 py-3 text-base text-text transition-colors focus:border-accent focus:outline-none"
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-2 font-mono text-xs text-error">
                  {errors.message}
                </p>
              )}
            </div>

            <Magnetic className="inline-block">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 font-mono text-xs font-medium tracking-[0.12em] text-accent-ink uppercase transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <span className="animate-pulse-dot inline-block h-2 w-2 rounded-full bg-accent-ink" />
                    {contact.form.submitting}
                  </>
                ) : status === "sent" ? (
                  contact.form.successLabel
                ) : (
                  <>
                    <PaperPlaneTilt size={16} weight="bold" aria-hidden />
                    {contact.form.submit}
                  </>
                )}
              </button>
            </Magnetic>
          </form>
        </Reveal>

        {/* Direct channels */}
        <Reveal delay={0.1}>
          <div className="space-y-8 md:pt-1">
            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
                {contact.direct.heading}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="text-h3 font-medium text-text transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
                <Magnetic>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex h-10 items-center gap-2 rounded-chip border border-line px-4 font-mono text-xs tracking-[0.12em] text-text-secondary uppercase transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    <Copy size={16} aria-hidden />
                    {copied ? contact.direct.copiedLabel : contact.direct.copyLabel}
                  </button>
                </Magnetic>
              </div>
            </div>

            <ul className="space-y-3">
              {site.socials
                .filter((s) => s.href !== "")
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-base text-text transition-colors hover:text-accent"
                    >
                      {s.label}
                      <ArrowUpRight
                        size={16}
                        aria-hidden
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
            </ul>

            <div>
              <a
                href={site.cvPath}
                download
                className="inline-flex h-11 items-center rounded-full border border-line px-6 font-mono text-xs tracking-[0.12em] text-text uppercase transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Download CV
              </a>
              <p className="mt-4 font-mono text-xs text-text-muted">
                {contact.direct.note}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-chip border-l-2 border-l-accent px-5 py-3 font-mono text-sm text-text"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type: "text" | "email";
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-xs tracking-[0.12em] text-text-secondary uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-chip border border-line bg-bg-elevated px-4 py-3 text-base text-text transition-colors focus:border-accent focus:outline-none"
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 font-mono text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
