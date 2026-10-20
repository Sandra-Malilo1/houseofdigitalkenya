import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, Check, AlertCircle, Github, Twitter, Linkedin } from "lucide-react";

const EMAIL = "sandramalilo21@gmail.com";

/**
 * Submissions go to EMAIL through FormSubmit (formsubmit.co): no account and
 * no form ID. The first time anyone submits, FormSubmit emails EMAIL an
 * activation link. Click it once and every message after that arrives normally.
 * Must run from a real URL (localhost or your domain), not a file:// page.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;
// One source of truth so the shown number and the tel: link can't disagree. Confirm this is correct.
const PHONE_TEL = "+254706825758";
const PHONE_DISPLAY = "+254 706 825 758";

// Same fonts as the hero (see the link in Hero.tsx).
const display = { fontFamily: "'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif" };
const body = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// EDIT: keep these in step with the services you list in the hero.
const SERVICES = ["Website", "Branding", "Marketing", "Something else"];
const BUDGETS = ["Under KES 50,000", "KES 50,000–150,000", "KES 150,000–500,000", "Over KES 500,000", "Not sure yet"];

const initialValues = {
  name: "",
  email: "",
  phone: "",
  service: SERVICES[0],
  budget: BUDGETS[BUDGETS.length - 1],
  message: "",
  website: "", // honeypot: real people never see or fill this
};

type Values = typeof initialValues;
type FieldName = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "message"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "That email doesn't look right. Check for typos.";
  if (v.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(v.phone.trim()))
    e.phone = "Use numbers only, like 0712 345 678.";
  if (v.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500";

const inputBase =
  "w-full rounded-xl border bg-zinc-950/50 px-4 py-3 text-[15px] text-[#F4F4F5] placeholder:text-[#71717A] focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-colors";

function Field({
  id, label, optional, error, children,
}: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-[#D4D4D8]">
        {label}
        {optional && <span className="text-xs font-normal text-[#8B8B94]">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-[13px] text-[#F0948A]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// Native radio underneath: arrow keys, grouping and screen readers work for free.
function Choice({
  name, value, checked, onSelect,
}: { name: string; value: string; checked: boolean; onSelect: (v: string) => void }) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio" name={name} value={value} checked={checked}
        onChange={() => onSelect(value)} className="peer sr-only"
      />
      <span className="block rounded-lg border border-[#27272A] px-3.5 py-2 text-sm font-medium text-[#A1A1AA] transition-colors hover:border-[#71717A] hover:text-[#F4F4F5] peer-checked:border-violet-500 peer-checked:bg-violet-500/10 peer-checked:text-violet-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-500">
        {value}
      </span>
    </label>
  );
}

export default function ContactSection() {
  const [values, setValues] = useState<Values>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sendError, setSendError] = useState("");
  const [sent, setSent] = useState({ firstName: "", email: "" });
  const successRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  const errors = validate(values);
  const visibleError = (f: FieldName) => (touched[f] || attempted ? errors[f] : undefined);

  // Move focus to the confirmation so screen-reader and keyboard users land on it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const inputProps = (f: FieldName) => ({
    id: f,
    name: f,
    value: values[f],
    onChange: handleChange,
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
    "aria-invalid": !!visibleError(f),
    "aria-describedby": visibleError(f) ? `${f}-error` : undefined,
    className: `${inputBase} ${visibleError(f) ? "border-[#E5766B]" : "border-[#27272A] focus:border-violet-500/50"}`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setAttempted(true);
    const firstInvalid = FIELD_ORDER.find((k) => errors[k]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    // A bot filled the hidden field: pretend it worked, send nothing.
    if (values.website) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    setSendError("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New enquiry from ${values.name.trim()}: ${values.service}`,
          name: values.name.trim(),
          email: values.email.trim(), // FormSubmit uses this as the reply-to address
          _template: "table",
          _captcha: "false",
          phone: values.phone.trim() || "Not given",
          service: values.service,
          budget: values.budget,
          message: values.message.trim(),
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !(data?.success === true || data?.success === "true")) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setSent({ firstName: values.name.trim().split(" ")[0], email: values.email.trim() });
      setValues(initialValues);
      setTouched({});
      setAttempted(false);
      setStatus("success");
    } catch (err) {
      // Keep everything they typed so nothing is lost.
      setStatus("error");
      setSendError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "We couldn't send your message. Check your connection and try again."
      );
    }
  };

  return (
    <section
      id="contact"
      style={body}
      className="relative scroll-mt-20 bg-zinc-950 py-24 text-zinc-100 antialiased selection:bg-violet-500 selection:text-white"
    >
      {/* Subtle grid background (as in the original) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-violet-500 opacity-20 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto grid max-w-6xl items-start gap-14 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Left: how else to reach us */}
        <div>
          <h2 style={display} className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Tell us about your project.
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-[#A1A1AA]">
            We're taking on new projects. Send us a few details and we'll reply within 24 hours.
          </p>

          <ul className="mt-10 space-y-6">
            <li>
              <a href={`mailto:${EMAIL}`} className={`group flex items-center gap-4 rounded-lg ${focusRing}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#27272A] bg-zinc-900 text-violet-400 transition-colors group-hover:border-violet-500/50">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-[#8B8B94]">Email</span>
                  <span className="font-semibold">{EMAIL}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`} className={`group flex items-center gap-4 rounded-lg ${focusRing}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#27272A] bg-zinc-900 text-violet-400 transition-colors group-hover:border-violet-500/50">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-[#8B8B94]">Phone</span>
                  <span className="font-semibold">{PHONE_DISPLAY}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#27272A] bg-zinc-900 text-violet-400">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-[#8B8B94]">Studio</span>
                <span className="font-semibold">Nairobi, Kiambu County, Kenya</span>
              </span>
            </li>
          </ul>

          {/* TODO: replace each "#" with your real profile URL */}
          <div className="mt-10 flex gap-3 border-t border-[#27272A] pt-8">
            {[
              { label: "Twitter", Icon: Twitter },
              { label: "LinkedIn", Icon: Linkedin },
              { label: "GitHub", Icon: Github },
            ].map(({ label, Icon }) => (
              <a
                key={label} href="#" aria-label={label}
                className={`rounded-lg border border-[#27272A] p-2.5 text-[#A1A1AA] transition-colors hover:border-violet-500/50 hover:text-violet-400 ${focusRing}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: form / confirmation */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="py-10 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white">
                  <Check className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 ref={successRef} tabIndex={-1} style={display} className="mt-5 text-2xl font-bold outline-none">
                  {sent.firstName ? `Thanks, ${sent.firstName}.` : "Message sent."}
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-[#A1A1AA]">
                  We got your message and will reply to {sent.email || "your email"} within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className={`mt-7 rounded-lg border border-[#27272A] px-5 py-2.5 text-sm font-semibold text-[#D4D4D8] transition-colors hover:border-[#71717A] hover:text-white ${focusRing}`}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Honeypot, hidden from people and screen readers */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this empty</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Your name" error={visibleError("name")}>
                    <input {...inputProps("name")} autoComplete="name" placeholder="Amina Otieno" />
                  </Field>
                  <Field id="email" label="Email" error={visibleError("email")}>
                    <input {...inputProps("email")} type="email" autoComplete="email" inputMode="email" placeholder="you@business.co.ke" />
                  </Field>
                </div>

                <Field id="phone" label="Phone or WhatsApp" optional error={visibleError("phone")}>
                  <input {...inputProps("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="0712 345 678" />
                </Field>

                <fieldset>
                  <legend className="mb-2.5 text-sm font-medium text-[#D4D4D8]">What do you need?</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICES.map((s) => (
                      <Choice key={s} name="service" value={s} checked={values.service === s} onSelect={(v) => setValues((x) => ({ ...x, service: v }))} />
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-2.5 flex w-full items-baseline justify-between text-sm font-medium text-[#D4D4D8]">
                    Budget
                    <span className="text-xs font-normal text-[#8B8B94]">Optional</span>
                  </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {BUDGETS.map((b) => (
                      <Choice key={b} name="budget" value={b} checked={values.budget === b} onSelect={(v) => setValues((x) => ({ ...x, budget: v }))} />
                    ))}
                  </div>
                </fieldset>

                <Field id="message" label="About your project" error={visibleError("message")}>
                  <textarea
                    {...inputProps("message")}
                    rows={5}
                    maxLength={2000}
                    placeholder="What does your business do, and what do you want this project to achieve?"
                    className={`${inputProps("message").className} resize-y`}
                  />
                </Field>

                {status === "error" && (
                  <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-[#E5766B]/40 bg-[#E5766B]/10 px-4 py-3 text-sm text-[#F5B1AA]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      {sendError} Your message is still here. You can also email{" "}
                      <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}