"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { site } from "@/content/site";

type NumericStep = 1 | 2;
type Step = NumericStep | "submitting" | "confirm";
type FormField = "name" | "email" | "company" | "pain" | "systems";

const TOTAL = 2;

const STEPS: Array<{ step: NumericStep; label: string }> = [
  { step: 1, label: "You" },
  { step: 2, label: "The work" },
];

const INITIAL_FORM: Record<FormField, string> = {
  name: "",
  email: "",
  company: "",
  pain: "",
  systems: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? site.bookingUrl;

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Record<FormField, string>>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Any element with `data-booker` opens the modal
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as Element | null;
      const trigger = target?.closest("[data-booker]");
      if (!trigger) return;
      e.preventDefault();
      setOpen(true);
      setStep(1);
      setErrors({});
      setSubmitError(null);
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Body scroll lock + ESC to close
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus the first input of the active step
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const input = bodyRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(".onb-step.active input, .onb-step.active textarea");
      input?.focus();
    }, 200);
    return () => window.clearTimeout(t);
  }, [open, step]);

  const updateField = (key: FormField, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = useCallback(
    (n: NumericStep): boolean => {
      const next: Partial<Record<FormField, string>> = {};
      if (n === 1) {
        if (form.name.trim().length < 2) next.name = "Name required";
        if (form.company.trim().length < 2) next.company = "Company required";
        if (!EMAIL_RE.test(form.email.trim())) next.email = "Valid email required";
      }
      if (n === 2) {
        if (form.pain.trim().length < 8) next.pain = "A sentence or two, please";
        if (form.systems.trim().length < 3)
          next.systems = "At least one system";
      }
      setErrors(next);
      return Object.keys(next).length === 0;
    },
    [form]
  );

  const submit = useCallback(async () => {
    setSubmitError(null);
    setStep("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `request-failed:${res.status}`);
      }
      setStep("confirm");
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      setSubmitError(detail);
      setStep(2);
    }
  }, [form]);

  const handleNext = () => {
    if (typeof step !== "number") return;
    if (!validate(step)) return;
    if (step === TOTAL) void submit();
    else setStep((step + 1) as NumericStep);
  };

  const handleBack = () => {
    if (typeof step === "number" && step > 1) {
      setStep((step - 1) as NumericStep);
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") {
      e.preventDefault();
      handleNext();
    } else if (target.tagName === "TEXTAREA" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleNext();
    }
  };

  if (!open) return null;

  const currentNum = step === 1 || step === 2 ? step : null;
  const isSubmitting = step === "submitting";
  const stepLabel =
    step === "confirm"
      ? "Sent · Awaiting reply"
      : isSubmitting
        ? "Sending…"
        : `Step ${String(step).padStart(2, "0")} / 0${TOTAL}`;

  const mailtoSubject = encodeURIComponent(
    `Working session — ${form.company || "intro"}`
  );

  return (
    <div
      className="onboarding open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onb-q-active"
      onKeyDown={handleKeyDown}
    >
      <div className="onb-head">
        <span className="onb-brand">GameChanger AI · Booking</span>
        <button
          type="button"
          className="onb-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          Close ×
        </button>
      </div>

      <div className="onb-progress">
        {STEPS.map((s) => {
          const isActive = currentNum === s.step;
          const isDone =
            step === "confirm" ||
            isSubmitting ||
            (currentNum !== null && s.step < currentNum);
          return (
            <div
              key={s.step}
              className={`cell${isActive ? " active" : ""}${
                isDone ? " done" : ""
              }`}
            >
              <span>{s.label}</span>
              <span className="num">
                0{s.step} / 0{TOTAL}
              </span>
            </div>
          );
        })}
      </div>

      <div className="onb-body" ref={bodyRef}>
        <div className={`onb-step${step === 1 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 01 / 02 · Introductions</span>
          <h2 className="onb-q" id={step === 1 ? "onb-q-active" : undefined}>
            Who is this for, and where should the reply land?
          </h2>
          <div className="onb-stack">
            <div className="onb-field">
              <label className="onb-label">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="First and last name"
                autoComplete="name"
              />
              {errors.name && <div className="onb-err">{errors.name}</div>}
            </div>
            <div className="onb-field">
              <label className="onb-label">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Company name"
                autoComplete="organization"
              />
              {errors.company && (
                <div className="onb-err">{errors.company}</div>
              )}
            </div>
            <div className="onb-field">
              <label className="onb-label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
              />
              {errors.email && <div className="onb-err">{errors.email}</div>}
            </div>
          </div>
        </div>

        <div className={`onb-step${step === 2 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 02 / 02 · The work</span>
          <h2 className="onb-q" id={step === 2 ? "onb-q-active" : undefined}>
            Where is the operation hurting, and what systems does it live in?
          </h2>
          <p className="onb-help">
            One or two sentences each — the real constraint, not a polished
            statement.
          </p>
          <div className="onb-stack">
            <div className="onb-field">
              <label className="onb-label">Primary pain</label>
              <textarea
                value={form.pain}
                onChange={(e) => updateField("pain", e.target.value)}
                placeholder="The thing that keeps costing time, visibility, or accuracy…"
              />
              {errors.pain && <div className="onb-err">{errors.pain}</div>}
            </div>
            <div className="onb-field">
              <label className="onb-label">Systems in play</label>
              <textarea
                value={form.systems}
                onChange={(e) => updateField("systems", e.target.value)}
                placeholder="ERP, CRM, spreadsheets, shared inboxes, internal tools — what the team actually opens daily."
              />
              {errors.systems && (
                <div className="onb-err">{errors.systems}</div>
              )}
            </div>
            {submitError && (
              <div className="onb-err onb-submit-err">
                Couldn&rsquo;t send — please retry, or email us at{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </div>
            )}
          </div>
        </div>

        <div className={`onb-step${isSubmitting ? " active" : ""}`}>
          <span className="onb-eyebrow">Sending…</span>
          <h2 className="onb-q">Handing this to the team.</h2>
          <p className="onb-help">One moment — sending your note.</p>
        </div>

        <div className={`onb-step${step === "confirm" ? " active" : ""}`}>
          <span className="onb-eyebrow">Got it · Your turn</span>
          <h2
            className="onb-q"
            id={step === "confirm" ? "onb-q-active" : undefined}
          >
            Got it — pick a time that works for you.
          </h2>
          <div className="onb-confirm">
            <p className="onb-help">
              Your note is in our inbox. Grab a slot below and we&rsquo;ll
              walk in already up to speed on your situation.
            </p>
            <div className="onb-confirm-actions">
              <a
                className="onb-book"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Pick a time</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="onb-mailto"
                href={`mailto:${site.email}?subject=${mailtoSubject}`}
              >
                <span>Prefer email · {site.email}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="summary">
              <div>
                <span className="k">Name</span>
                <span className="v">{form.name}</span>
              </div>
              <div>
                <span className="k">Email</span>
                <span className="v">{form.email}</span>
              </div>
              <div>
                <span className="k">Company</span>
                <span className="v">{form.company}</span>
              </div>
              <div>
                <span className="k">Pain</span>
                <span className="v">{form.pain}</span>
              </div>
              <div>
                <span className="k">Systems</span>
                <span className="v">{form.systems}</span>
              </div>
            </div>
            <div className="onb-confirm-close">
              <button
                type="button"
                className="onb-done"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {step !== "confirm" && (
        <div className="onb-foot">
          <div className="onb-foot-left">
            <span>{stepLabel}</span>
          </div>
          <div className="onb-nav">
            <button
              type="button"
              className="onb-back"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
            >
              ← Back
            </button>
            <button
              type="button"
              className="onb-next"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending…"
                : step === TOTAL
                  ? "Send →"
                  : "Continue →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
