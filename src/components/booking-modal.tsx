"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

type NumericStep = 1 | 2 | 3 | 4 | 5;
type Step = NumericStep | "confirm";
type FormField = "name" | "email" | "company" | "pain" | "systems";

const TOTAL = 5;

const STEPS: Array<{ step: NumericStep; label: string }> = [
  { step: 1, label: "Name" },
  { step: 2, label: "Email" },
  { step: 3, label: "Company" },
  { step: 4, label: "Pain" },
  { step: 5, label: "Systems" },
];

const INITIAL_FORM: Record<FormField, string> = {
  name: "",
  email: "",
  company: "",
  pain: "",
  systems: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Record<FormField, string>>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<NumericStep, string>>>({});
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
  };

  const validate = useCallback(
    (n: NumericStep): boolean => {
      const nextErrors: Partial<Record<NumericStep, string>> = {};
      let valid = true;
      if (n === 1 && form.name.trim().length < 2) {
        nextErrors[1] = "Name required";
        valid = false;
      }
      if (n === 2 && !EMAIL_RE.test(form.email.trim())) {
        nextErrors[2] = "Valid email required";
        valid = false;
      }
      if (n === 3 && form.company.trim().length < 2) {
        nextErrors[3] = "Company name required";
        valid = false;
      }
      if (n === 4 && form.pain.trim().length < 8) {
        nextErrors[4] = "A sentence or two, please";
        valid = false;
      }
      if (n === 5 && form.systems.trim().length < 3) {
        nextErrors[5] = "At least one system";
        valid = false;
      }
      setErrors(nextErrors);
      return valid;
    },
    [form]
  );

  const handleNext = () => {
    if (typeof step !== "number") return;
    if (!validate(step)) return;
    if (step === TOTAL) setStep("confirm");
    else setStep((step + 1) as NumericStep);
  };

  const handleBack = () => {
    if (typeof step === "number" && step > 1) {
      setStep((step - 1) as NumericStep);
    }
  };

  const handleSkip = () => {
    if (typeof step !== "number" || step < 2) return;
    if (form.name.trim().length < 2) {
      setStep(1);
      setErrors({ 1: "Name required first" });
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setStep(2);
      setErrors({ 2: "Valid email required first" });
      return;
    }
    setForm((prev) => ({
      ...prev,
      company: prev.company.trim() || "(to discuss on call)",
      pain: prev.pain.trim() || "(to discuss on call)",
      systems: prev.systems.trim() || "(to discuss on call)",
    }));
    setStep("confirm");
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

  const downloadICS = () => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    while (start.getDay() === 0 || start.getDay() === 6) {
      start.setDate(start.getDate() + 1);
    }
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 45 * 60_000);
    const fmt = (dt: Date) =>
      dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const uid = `gc-${Date.now()}@gamechanger-ai.dev`;
    const descLines = [
      "Working session with GameChanger AI.",
      "",
      "Submitted:",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Pain: ${form.pain}`,
      `Systems: ${form.systems}`,
    ];
    const desc = descLines.join("\\n");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//GameChanger AI//Booking//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      "SUMMARY:GameChanger AI — Working session",
      `DESCRIPTION:${desc}`,
      "LOCATION:Video call (link to follow)",
      "ORGANIZER;CN=GameChanger AI:mailto:hello@gamechanger-ai.dev",
      `ATTENDEE;CN=${form.name};RSVP=TRUE:mailto:${form.email}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gamechanger-working-session.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 2_000);
  };

  if (!open) return null;

  const currentNum = step === "confirm" ? null : step;
  const stepLabel =
    step === "confirm"
      ? "Review & book"
      : `Step ${String(step).padStart(2, "0")} / 0${TOTAL}`;

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
            step === "confirm" || (currentNum !== null && s.step < currentNum);
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
          <span className="onb-eyebrow">Step 01 / 05 · Introductions</span>
          <h2 className="onb-q" id={step === 1 ? "onb-q-active" : undefined}>
            What should we call you?
          </h2>
          <div className="onb-field">
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="First and last name"
              autoComplete="name"
            />
          </div>
          <div className="onb-err">{errors[1] ?? ""}</div>
        </div>

        <div className={`onb-step${step === 2 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 02 / 05 · Contact</span>
          <h2 className="onb-q" id={step === 2 ? "onb-q-active" : undefined}>
            Where should the invite land?
          </h2>
          <div className="onb-field">
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
          <div className="onb-err">{errors[2] ?? ""}</div>
        </div>

        <div className={`onb-step${step === 3 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 03 / 05 · Company</span>
          <h2 className="onb-q" id={step === 3 ? "onb-q-active" : undefined}>
            What company is this for?
          </h2>
          <div className="onb-field">
            <input
              type="text"
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Company name"
              autoComplete="organization"
            />
          </div>
          <div className="onb-err">{errors[3] ?? ""}</div>
        </div>

        <div className={`onb-step${step === 4 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 04 / 05 · Primary pain</span>
          <h2 className="onb-q" id={step === 4 ? "onb-q-active" : undefined}>
            Where is the operation hurting?
          </h2>
          <p className="onb-help">
            One or two sentences is enough. We care about the real constraint,
            not a polished statement.
          </p>
          <div className="onb-field">
            <textarea
              value={form.pain}
              onChange={(e) => updateField("pain", e.target.value)}
              placeholder="The thing that keeps costing time, visibility, or accuracy…"
            />
          </div>
          <div className="onb-err">{errors[4] ?? ""}</div>
        </div>

        <div className={`onb-step${step === 5 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 05 / 05 · Systems in play</span>
          <h2 className="onb-q" id={step === 5 ? "onb-q-active" : undefined}>
            What systems does work live in today?
          </h2>
          <p className="onb-help">
            ERP, CRM, spreadsheets, shared inboxes, bespoke internal tools —
            whatever the team actually opens daily.
          </p>
          <div className="onb-field">
            <textarea
              value={form.systems}
              onChange={(e) => updateField("systems", e.target.value)}
              placeholder="e.g. NetSuite, Gmail shared inbox, a 14-tab ops spreadsheet, custom Rails admin…"
            />
          </div>
          <div className="onb-err">{errors[5] ?? ""}</div>
        </div>

        <div className={`onb-step${step === "confirm" ? " active" : ""}`}>
          <span className="onb-eyebrow">Confirmed · Ready to book</span>
          <h2
            className="onb-q"
            id={step === "confirm" ? "onb-q-active" : undefined}
          >
            Here is what we have. Add the 45-min working session to your
            calendar.
          </h2>
          <div className="onb-confirm">
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
            <button type="button" className="ics-btn" onClick={downloadICS}>
              Download .ics invite <span aria-hidden="true">↓</span>
            </button>
            <p className="onb-help">
              The invite schedules a 45-minute working session for the next
              business day at 10:00 local time. We will confirm by email within
              2 business days and adjust the time if needed.
            </p>
          </div>
        </div>
      </div>

      <div className="onb-foot">
        <div className="onb-foot-left">
          <span>{stepLabel}</span>
          {typeof step === "number" && step >= 2 && (
            <button type="button" className="onb-skip" onClick={handleSkip}>
              Skip to booking →
            </button>
          )}
        </div>
        {step !== "confirm" && (
          <div className="onb-nav">
            <button
              type="button"
              className="onb-back"
              onClick={handleBack}
              disabled={step === 1}
            >
              ← Back
            </button>
            <button type="button" className="onb-next" onClick={handleNext}>
              {step === TOTAL ? "Review →" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
