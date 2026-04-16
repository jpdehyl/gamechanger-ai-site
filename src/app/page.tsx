import { SectionHeading } from "@/components/section-heading";
import {
  faqs,
  fit,
  heroStats,
  processSteps,
  proofItems,
  services,
  team,
} from "@/content/site";

export default function Home() {
  return (
    <main className="bg-[#f5f2ea] text-black">

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f5f2ea]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <span className="text-sm font-medium tracking-wide text-black">GameChanger AI</span>
          <a
            href="#cta"
            className="rounded-full border border-black bg-black px-5 py-2 text-xs font-medium transition-colors hover:bg-black/80 text-[#f0ebeb]"
          >
            Book a session
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-0 md:px-10 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">

          {/* Left: headline + CTAs */}
          <div className="flex flex-col justify-between gap-16">
            <div className="grid gap-8">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#1749ff]">
                Built for operators in the real world
              </p>
              <h1 className="font-serif text-5xl leading-[1.04] text-black md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                AI that works inside the business you already have.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-black/60">
                We help companies audit operations, redesign workflows, and implement practical AI tools without pretending the old systems, approval chains, and operational constraints do not exist.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="rounded-full bg-black px-7 py-3.5 text-sm font-medium transition-colors hover:bg-black/80 text-[#f5eded]"
              >
                Book the working session
              </a>
              <a
                href="#services"
                className="rounded-full border border-black/20 bg-transparent px-7 py-3.5 text-sm font-medium text-black transition-colors hover:border-black/50"
              >
                What we do ↓
              </a>
            </div>
          </div>

          {/* Right: Mondrian composition */}
          <div className="hidden lg:block">
            <div className="grid h-full min-h-[480px] grid-cols-3 grid-rows-4 gap-2">
              <div className="col-span-2 row-span-2 bg-[#1749ff]" />
              <div className="col-span-1 row-span-1 bg-[#ffde59]" />
              <div className="col-span-1 row-span-1 border border-black/10 bg-white" />
              <div className="col-span-1 row-span-2 bg-[#e53935]" />
              <div className="col-span-2 row-span-1 border border-black/10 bg-transparent" />
              <div className="col-span-1 row-span-1 bg-[#ffde59]" />
              <div className="col-span-1 row-span-1 bg-black" />
              <div className="col-span-1 row-span-1 border border-black/10 bg-white" />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 border-t border-black/10">
          <div className="grid grid-cols-1 divide-y divide-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {heroStats.map((item) => (
              <div key={item.label} className="px-0 py-10 sm:px-10 first:sm:pl-0 last:sm:pr-0">
                <p className="font-serif text-5xl text-black">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-black/50">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="mt-0 border-t border-black/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-black/10 bg-[#1749ff] px-10 py-16 text-white md:border-b-0 md:border-r md:border-white/10 md:px-14 md:py-20">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">Before</p>
              <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">
                Smart people, patchwork processes, and old systems nobody wants to touch.
              </p>
            </div>
            <div className="bg-[#0d0d0d] px-10 py-16 text-white md:px-14 md:py-20">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">After</p>
              <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">
                Clear workflows, useful internal AI tools, and adoption that survives contact with daily operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="Services"
          title="What we do when AI needs to fit the operation, not the keynote"
          description="Audit, redesign, and implementation support for companies that cannot afford generic advice or brittle automation."
        />
        <div className="mt-20 grid border-t border-black/10 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`py-12 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"} ${index < 2 ? "md:border-b md:border-black/10" : ""} ${index % 2 === 0 && index < services.length - 1 ? "border-b border-black/10 md:border-b md:border-r md:border-black/10" : "border-b border-black/10 last:border-b-0"}`}
            >
              <p className="text-xs font-medium tabular-nums tracking-[0.2em] text-black/30">0{index + 1}</p>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-black md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-black/58">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            eyebrow="Process"
            title="A practical sequence from audit to adoption"
            description="We work in deliberate passes so the implementation fits the business instead of turning into another stalled initiative."
          />
          <div className="mt-20 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.index}
                className={`p-8 ${index === 1 ? "bg-[#ffde59]" : index === 2 ? "bg-[#f5f2ea]" : index === 3 ? "bg-[#1749ff] text-white" : "border border-black/10 bg-white"}`}
              >
                <p className={`text-xs font-medium tabular-nums tracking-[0.2em] ${index === 3 ? "text-white/50" : "text-black/35"}`}>
                  {step.index}
                </p>
                <h3 className="mt-10 text-xl font-medium leading-tight">{step.title}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 3 ? "text-white/70" : "text-black/58"}`}>
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:grid lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="Proof"
            title="Proof should come from systems that shipped and workflows that improved"
            description="The structure is ready for real examples, but we are not stuffing the page with fake numbers or synthetic bravado."
          />
          <div className="mt-12 grid gap-0 border-t border-black/10 lg:mt-0 lg:border-t-0 lg:border-l lg:pl-0">
            {proofItems.map((item, index) => (
              <div
                key={item}
                className={`py-8 text-base leading-7 text-black/70 ${index < proofItems.length - 1 ? "border-b border-black/10" : ""} ${index === 1 ? "lg:pl-12" : "lg:pl-12"}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            eyebrow="Team"
            title="A small team that can think commercially and execute inside messy operations"
            description="No strategy handoff circus. The people shaping the approach are the same people close to the systems and the implementation."
          />
          <div className="mt-20 grid gap-0 border-t border-black/10 md:grid-cols-3 md:divide-x md:divide-black/10">
            {team.map((person, index) => (
              <article
                key={person.name}
                className={`py-10 md:px-10 first:md:pl-0 last:md:pr-0 ${index < team.length - 1 ? "border-b border-black/10 md:border-b-0" : ""}`}
              >
                <div
                  className={`inline-block h-1.5 w-10 ${index === 0 ? "bg-[#ffde59]" : index === 1 ? "bg-[#1749ff]" : "bg-[#e53935]"}`}
                />
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-black/40">{person.role}</p>
                <h3 className="mt-4 font-serif text-2xl text-black">{person.name}</h3>
                <p className="mt-4 text-sm leading-7 text-black/58">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fit */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            eyebrow="Fit"
            title="Who this is for, and who should skip it"
            description="The work goes best when leadership wants practical leverage, not a cosmetic AI story for the website."
          />
          <div className="mt-20 grid gap-6 md:grid-cols-2">
            <div className="bg-[#1749ff] p-10 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/55">For</p>
              <ul className="mt-8 grid gap-5 text-base leading-7">
                {fit.for.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-white/50">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-black/10 bg-white p-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-black/40">Not for</p>
              <ul className="mt-8 grid gap-5 text-base leading-7 text-black/70">
                {fit.notFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-black/30">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            eyebrow="FAQ"
            title="Straight answers"
            description="Short version: we help companies make AI useful inside the operational reality they already have."
          />
          <div className="mt-20 grid gap-0 border-t border-black/10 lg:grid-cols-2 lg:gap-x-24">
            {faqs.map((faq, index) => (
              <article
                key={faq.question}
                className={`py-10 ${index < faqs.length - 1 ? "border-b border-black/10" : ""} ${index === faqs.length - 1 ? "lg:border-b-0" : ""} ${index === faqs.length - 2 ? "lg:border-b-0" : ""}`}
              >
                <h3 className="font-serif text-xl text-black md:text-2xl">{faq.question}</h3>
                <p className="mt-4 text-base leading-7 text-black/58">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="border-t border-black/10 bg-[#ffde59]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-black/50">Get started</p>
              <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-black md:text-5xl lg:text-6xl xl:text-7xl">
                If AI sounds promising but your operation is full of edge cases, that is exactly where we work.
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <a
                href="mailto:hello@gamechanger.ai"
                className="inline-block rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-black/80"
              >
                hello@gamechanger.ai
              </a>
              <a
                href="#"
                className="inline-block rounded-full border border-black/20 bg-white/60 px-8 py-4 text-sm font-medium text-black transition-colors hover:bg-white"
              >
                Schedule intro call
              </a>
              <p className="max-w-xs text-right text-sm leading-6 text-black/60">
                Book a working session. We will review the current workflow, the system constraints, and the best first use cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-10">
          <span className="text-sm text-white/40">GameChanger AI</span>
          <span className="text-sm text-white/30">© 2025</span>
        </div>
      </footer>

    </main>
  );
}
