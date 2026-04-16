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
    <main className="bg-[#f3f0e8] text-black">
      <section className="border-b-8 border-black">
        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 border-x-8 border-black bg-[#f3f0e8] xl:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b-8 border-black p-6 md:p-10 xl:border-b-0 xl:border-r-8 xl:p-14">
            <div className="grid h-full gap-12">
              <div className="flex items-start justify-between gap-6 border-b-4 border-black pb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1749ff]">GameChanger AI</p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-black/70">
                    Practical AI consulting for companies with legacy systems, operational drag, and no patience for theatre.
                  </p>
                </div>
                <a
                  href="#cta"
                  className="border-4 border-black bg-[#ffde59] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] transition-transform hover:-translate-y-0.5"
                >
                  Book the working session
                </a>
              </div>

              <div className="grid gap-6">
                <p className="max-w-52 border-4 border-black bg-[#1749ff] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Built for operators in the real world
                </p>
                <h1 className="max-w-5xl text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.08em] md:text-7xl xl:text-[6.8rem]">
                  AI that works inside the business you already have.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-black/76 md:text-xl">
                  We help companies audit operations, redesign workflows, and implement practical AI tools without pretending the
                  old systems, approval chains, and operational constraints do not exist.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {heroStats.map((item, index) => (
                  <div
                    key={item.label}
                    className={`border-4 border-black p-5 ${index === 1 ? "bg-[#e53935] text-white" : index === 2 ? "bg-white" : "bg-[#ffde59]"}`}
                  >
                    <p className="text-3xl font-semibold tracking-[-0.08em] md:text-4xl">{item.value}</p>
                    <p className="mt-3 text-sm uppercase leading-6 tracking-[0.18em]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-rows-[auto_1fr_auto] bg-white">
            <div className="border-b-8 border-black p-6 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/55">What changes</p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-1">
              <div className="border-b-8 border-black bg-[#1749ff] p-6 text-white md:border-r-8 md:border-b-0 xl:border-r-0 xl:border-b-8 xl:p-10">
                <p className="text-sm uppercase tracking-[0.22em] text-white/74">Before</p>
                <p className="mt-4 text-2xl font-semibold uppercase leading-tight tracking-[-0.05em]">
                  Smart people, patchwork processes, and old systems nobody wants to touch.
                </p>
              </div>
              <div className="border-b-8 border-black bg-[#e53935] p-6 text-white xl:p-10">
                <p className="text-sm uppercase tracking-[0.22em] text-white/74">After</p>
                <p className="mt-4 text-2xl font-semibold uppercase leading-tight tracking-[-0.05em]">
                  Clear workflows, useful internal AI tools, and adoption that survives contact with daily operations.
                </p>
              </div>
            </div>
            <div className="p-6 md:p-10">
              <p className="max-w-md text-sm leading-7 text-black/72">
                This is not AI theatre. It is operational redesign and implementation for teams that have real constraints and still need leverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-x-8 border-b-8 border-black bg-white px-6 py-14 md:px-10 md:py-18 xl:px-14">
        <SectionHeading
          eyebrow="Services"
          title="What we do when AI needs to fit the operation, not the keynote"
          description="Audit, redesign, and implementation support for companies that cannot afford generic advice or brittle automation."
        />
        <div className="mt-10 grid gap-0 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`border-black p-6 md:p-8 ${index % 2 === 0 ? "md:border-r-4" : ""} ${index < 2 ? "border-b-4" : ""}`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-black/45">0{index + 1}</p>
              <h3 className="mt-4 max-w-md text-2xl font-semibold uppercase leading-tight tracking-[-0.05em]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-black/72">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-x-8 border-b-8 border-black bg-[#f3f0e8] px-6 py-14 md:px-10 md:py-18 xl:px-14">
        <SectionHeading
          eyebrow="Process"
          title="A practical sequence from audit to adoption"
          description="We work in deliberate passes so the implementation fits the business instead of turning into another stalled initiative."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.index}
              className={`border-4 border-black p-6 ${index === 1 ? "bg-[#ffde59]" : index === 2 ? "bg-white" : index === 3 ? "bg-[#1749ff] text-white" : "bg-transparent"}`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em]">{step.index}</p>
              <h3 className="mt-8 text-2xl font-semibold uppercase leading-tight tracking-[-0.05em]">{step.title}</h3>
              <p className="mt-4 text-base leading-7 opacity-80">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl border-x-8 border-b-8 border-black bg-white xl:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b-8 border-black p-6 md:p-10 xl:border-r-8 xl:border-b-0 xl:p-14">
          <SectionHeading
            eyebrow="Proof"
            title="Proof should come from systems that shipped and workflows that improved"
            description="The structure is ready for real examples, but we are not stuffing the page with fake numbers or synthetic bravado."
          />
        </div>
        <div className="grid">
          {proofItems.map((item, index) => (
            <div
              key={item}
              className={`border-black p-6 text-base leading-7 md:p-10 ${index < proofItems.length - 1 ? "border-b-4" : ""} ${index === 1 ? "bg-[#ffde59]" : index === 2 ? "bg-[#e53935] text-white" : "bg-[#f3f0e8]"}`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-x-8 border-b-8 border-black bg-[#f3f0e8] px-6 py-14 md:px-10 md:py-18 xl:px-14">
        <SectionHeading
          eyebrow="Team"
          title="A small team that can think commercially and execute inside messy operations"
          description="No strategy handoff circus. The people shaping the approach are the same people close to the systems and the implementation."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {team.map((person, index) => (
            <article
              key={person.name}
              className={`border-4 border-black p-6 md:p-8 ${index === 1 ? "bg-white" : index === 2 ? "bg-[#1749ff] text-white" : "bg-[#ffde59]"}`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em]">{person.role}</p>
              <h3 className="mt-8 text-3xl font-semibold uppercase leading-tight tracking-[-0.06em]">{person.name}</h3>
              <p className="mt-4 max-w-sm text-base leading-7 opacity-80">{person.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl border-x-8 border-b-8 border-black bg-white lg:grid-cols-2">
        <div className="border-b-8 border-black p-6 md:p-10 lg:border-r-8 lg:border-b-0 lg:p-14">
          <SectionHeading
            eyebrow="Fit"
            title="Who this is for, and who should skip it"
            description="The work goes best when leadership wants practical leverage, not a cosmetic AI story for the website."
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="border-b-8 border-black bg-[#1749ff] p-6 text-white md:border-r-8 md:border-b-0 xl:border-r-4 xl:border-b-0 xl:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/72">For</p>
            <ul className="mt-6 grid gap-4 text-base leading-7">
              {fit.for.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-[#e53935] p-6 text-white xl:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/72">Not for</p>
            <ul className="mt-6 grid gap-4 text-base leading-7">
              {fit.notFor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-x-8 border-b-8 border-black bg-[#f3f0e8] px-6 py-14 md:px-10 md:py-18 xl:px-14">
        <SectionHeading
          eyebrow="FAQ"
          title="Straight answers"
          description="Short version: we help companies make AI useful inside the operational reality they already have."
        />
        <div className="mt-10 grid gap-0">
          {faqs.map((faq) => (
            <article key={faq.question} className="border-b-4 border-black py-6 first:pt-0 last:border-b-0 last:pb-0">
              <h3 className="text-xl font-semibold uppercase leading-tight tracking-[-0.04em]">{faq.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-black/72">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-7xl border-x-8 border-b-8 border-black bg-white p-6 md:p-10 xl:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1749ff]">CTA</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.07em] md:text-6xl">
              If AI sounds promising but your operation is full of edge cases, that is exactly where we work.
            </h2>
          </div>
          <div className="border-4 border-black bg-[#ffde59] p-6 md:p-8">
            <p className="text-base leading-7 text-black/78">
              Book a working session. We will review the current workflow, the system constraints, and the best first internal use cases to implement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:hello@gamechanger.ai"
                className="border-4 border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-white transition-transform hover:-translate-y-0.5"
              >
                hello@gamechanger.ai
              </a>
              <a
                href="#"
                className="border-4 border-black bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] transition-transform hover:-translate-y-0.5"
              >
                Schedule intro
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
