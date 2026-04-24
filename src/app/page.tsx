import { Fragment } from "react";
import { AiWire } from "@/components/ai-wire";
import {
  beforeAfter,
  cta,
  diagram,
  faqs,
  fit,
  hero,
  heroStats,
  processSteps,
  proof,
  services,
  site,
  team,
} from "@/content/site";

function RuleEdge({ variant }: { variant: "top" | "bottom" }) {
  return (
    <div className={`rule-edge ${variant}`} aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div className="cell" key={i}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
        </div>
      ))}
    </div>
  );
}

function Ticker({
  items,
  after = false,
}: {
  items: readonly string[];
  after?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`ba-ticker${after ? " after" : ""}`} aria-hidden="true">
      <div className="ba-track">
        {doubled.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const now = new Date();
  const diagramDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;

  return (
    <main>
      {/* NAV */}
      <header className="nav">
        <div className="container-x nav-inner">
          <div className="brand">
            <span className="brand-mark">{site.brand}</span>
            <span className="brand-sub">{site.established}</span>
          </div>
          <nav className="nav-links" aria-label="Primary">
            {site.nav.map((link) => (
              <a className="nav-link" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary" href="#cta">
            <span className="dot" />
            Book a session
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="container-x" aria-label="Hero">
        <div className="sheet-sig">
          <span>Sheet 01 / Homepage</span>
          <span className="right">Fig. 01 — Where AI fits</span>
        </div>

        <RuleEdge variant="top" />

        <div className="ruled-surface">
          <div className="ruled">
            <div className="c-1-7 hero-left">
              <span className="kicker">{hero.kicker}</span>
              <h1 className="hero">{hero.headline}</h1>
              <p className="hero-lede">{hero.lede}</p>

              <dl className="hero-meta">
                {hero.meta.map((row) => (
                  <Fragment key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.detail}</dd>
                  </Fragment>
                ))}
              </dl>

              <div className="hero-cta">
                <a className="btn btn-primary" href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </a>
                <a className="btn btn-ghost" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </a>
                <span className="cta-note">{hero.ctaNote}</span>
              </div>

              <div className="plate" aria-hidden="true">
                <div className="mond">
                  <div className="b1" />
                  <div className="b2" />
                  <div className="b3" />
                  <div className="b4" />
                  <div className="b5" />
                </div>
                <div className="plate-cap">
                  <b>Plate 00</b>
                  <br />
                  Composition in
                  <br />
                  signal · highlight · warn
                </div>
              </div>
            </div>

            <div className="c-8-12">
              <figure
                className="diagram"
                aria-label="Operating diagram — where AI fits"
              >
                <figcaption className="diagram-header">
                  <span className="left">Fig. 01</span>
                  <span>
                    Operating Diagram · v. {diagramDate} ·{" "}
                    <span
                      className="live-dot"
                      style={{ color: "var(--signal)" }}
                    >
                      ● LIVE
                    </span>
                  </span>
                </figcaption>

                <div className="diagram-body diagram-inner">
                  {diagram.rows.map((row) => (
                    <div
                      className={`row${row.key === "decision" ? " decision" : ""}`}
                      data-row={row.key}
                      key={row.key}
                    >
                      <div className="row-label">
                        <span className="tick" />
                        {row.label}
                      </div>
                      <div
                        className={`track${row.key === "decision" ? " decision" : ""}`}
                      >
                        <div
                          className={`node${row.nodes[0].ai ? " is-ai" : ""}`}
                        >
                          <span className="idx">{row.nodes[0].idx}</span>
                          {row.nodes[0].label}
                        </div>
                        <div
                          className={`conn${
                            row.key === "decision" ? " is-ai-in" : ""
                          }`}
                        />
                        <div
                          className={`node${row.nodes[1].ai ? " is-ai" : ""}`}
                        >
                          <span className="idx">{row.nodes[1].idx}</span>
                          {row.nodes[1].label}
                        </div>
                        <div
                          className={`conn${
                            row.key === "decision" ? " is-ai-out" : ""
                          }`}
                        />
                        <div
                          className={`node${row.nodes[2].ai ? " is-ai" : ""}`}
                        >
                          <span className="idx">{row.nodes[2].idx}</span>
                          {row.nodes[2].label}
                        </div>
                        {row.key === "decision" && (
                          <>
                            <span className="vconn up" aria-hidden="true" />
                            <span className="vconn down" aria-hidden="true" />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="diagram-caption">
                  <span className="lead">Fig. 01 — Where AI fits</span>
                  <span>1 of 1 · not to scale</span>
                </div>
              </figure>
            </div>
          </div>
        </div>

        <RuleEdge variant="bottom" />

        {/* STATS */}
        <div className="stats-wrap">
          <div className="stats">
            {heroStats.map((s, i) => (
              <div
                className={`stat ${i === 0 ? "first" : i === heroStats.length - 1 ? "last" : "mid"}`}
                key={i}
              >
                <div className="label-top">
                  <span>Metric {String(i + 1).padStart(2, "0")}</span>
                  <span>{s.kind}</span>
                </div>
                <div className="value">
                  {s.value}
                  {s.unit && <span className="unit">{s.unit}</span>}
                </div>
                <div className="desc">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 96 }} />
      </section>

      {/* BEFORE / AFTER */}
      <section className="container-x section-rule" aria-label="Before and After">
        <div className="sheet-sig">
          <span>Sheet 02 / Before &amp; After</span>
          <span className="right">Fig. 02 — State change</span>
        </div>
        <RuleEdge variant="top" />

        <div className="beforeafter">
          <div className="ba-cell before">
            <div className="ba-label">
              <span>Before</span>
              <span className="badge">{beforeAfter.before.label}</span>
            </div>
            <p className="ba-text">{beforeAfter.before.text}</p>
            <div className="ba-mond" aria-hidden="true">
              <div className="m1" />
              <div className="m2" />
              <div className="m3" />
            </div>
            <Ticker items={beforeAfter.before.ticker} />
            <div className="ba-meta">{beforeAfter.before.meta}</div>
          </div>

          <div className="ba-cell after">
            <div className="ba-label">
              <span>After</span>
              <span className="badge">{beforeAfter.after.label}</span>
            </div>
            <p className="ba-text">{beforeAfter.after.text}</p>
            <div className="ba-mond" aria-hidden="true">
              <div className="m1" />
              <div className="m2" />
              <div className="m3" />
            </div>
            <Ticker items={beforeAfter.after.ticker} after />
            <div className="ba-meta">{beforeAfter.after.meta}</div>
          </div>
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* SERVICES */}
      <section id="services" className="container-x section" aria-label="Services">
        <div className="section-head">
          <div className="eyebrow">
            <span>Services · Sheet 03</span>
            <span className="right">§ 03</span>
          </div>
          <h2>Where we create measurable business wins.</h2>
          <p className="desc">
            Audit, design, and implementation — partnerships for operators who want AI woven into
            the business they already run. We're passionate about these tools and build with them
            every day, so your team stays ahead of what's suddenly possible.
          </p>
        </div>
        <RuleEdge variant="top" />

        <div className="services-grid">
          {services.map((s, i) => (
            <article className="service" key={s.title}>
              <div className="num">0{i + 1}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="tag">{s.tag}</span>
              </div>
            </article>
          ))}
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="container-x section section-rule"
        aria-label="Process"
      >
        <div className="section-head">
          <div className="eyebrow">
            <span>Process · Sheet 04</span>
            <span className="right">§ 04</span>
          </div>
          <h2>From first conversation to compounding wins.</h2>
          <p className="desc">
            We move in deliberate passes so momentum builds early and every step ships something
            your team can actually use.
          </p>
        </div>
        <RuleEdge variant="top" />

        <div className="process">
          {processSteps.map((s) => (
            <article className={`step${s.ai ? " is-ai" : ""}`} key={s.index}>
              <div className="step-top">
                <span className="idx">{s.index}</span>
                <span className={`chip ${s.chip}`} aria-hidden="true" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* PROOF */}
      <section
        id="proof"
        className="container-x section section-rule"
        aria-label="Proof"
      >
        <div className="section-head">
          <div className="eyebrow">
            <span>Proof · Sheet 05</span>
            <span className="right">§ 05</span>
          </div>
          <h2>Operators shipping with us, not talking about us.</h2>
          <p className="desc">
            Case studies from inside real businesses — actual screens from the work, not
            mockups, not decks.
          </p>
        </div>
        <RuleEdge variant="top" />

        <div className="proof-grid">
          <div className="proof-left">
            <div className="proof-kicker">{proof.kicker}</div>
            <h3 className="proof-title">{proof.title}</h3>
            <p className="proof-summary">{proof.summary}</p>
            <a
              className="proof-url"
              href={`https://${proof.url}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="dot" />
              <span>{proof.url}</span>
              <span className="glyph">↗</span>
            </a>
            <div className="proof-meta">
              {proof.meta.map((row) => (
                <div key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="proof-right">
            <article className="proof-block">
              <div className="proof-block-label">{proof.problem.label}</div>
              <h4 className="proof-block-title">{proof.problem.title}</h4>
              <p className="proof-block-body">{proof.problem.body}</p>
            </article>
            <article className="proof-block is-approach">
              <div className="proof-block-label">{proof.approach.label}</div>
              <h4 className="proof-block-title">{proof.approach.title}</h4>
              <p className="proof-block-body">{proof.approach.body}</p>
            </article>
            <div className="proof-outcomes">
              <div className="proof-outcomes-head">
                <span>03 / Outcomes</span>
                <span className="right">measured, not promised</span>
              </div>
              <div className="proof-outcomes-grid">
                {proof.outcomes.map((o, i) => (
                  <div className="proof-outcome" key={i}>
                    <div className="po-value">{o.v}</div>
                    <div className="po-label">{o.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="proof-plates">
          <div className="proof-plates-head">
            <span>Plates 05.A — 05.C</span>
            <span className="right">Modules shipped · live in production</span>
          </div>
          {proof.plates.map((plate) => (
            <figure className="proof-plate" key={plate.tag}>
              <div className="proof-plate-meta">
                <span className="tag">{plate.tag}</span>
                <span className="kicker">{plate.kicker}</span>
              </div>
              <div className="proof-plate-shot">
                <div className="proof-shot-bar" aria-hidden="true">
                  <span className="d r" />
                  <span className="d y" />
                  <span className="d g" />
                  <span className="addr">{proof.url}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={plate.img} alt={plate.alt} loading="lazy" />
              </div>
              <figcaption className="proof-plate-cap">
                <h5>{plate.title}</h5>
                <p>{plate.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* TEAM */}
      <section id="team" className="container-x section section-rule" aria-label="Team">
        <div className="section-head">
          <div className="eyebrow">
            <span>Team · Sheet 06</span>
            <span className="right">§ 06</span>
          </div>
          <h2>
            A small team that thinks commercially and ships alongside you.
          </h2>
          <p className="desc">
            The people shaping the strategy are the same people close to the code, the systems,
            and the implementation.
          </p>
        </div>
        <RuleEdge variant="top" />

        <div className="team-grid">
          {team.map((m, i) => (
            <article className="member" key={m.name}>
              <div className="portrait">
                {m.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.img} alt={m.name} loading="lazy" />
                )}
                <span className="tag">
                  Plate 06.{String.fromCharCode(65 + i)}
                </span>
              </div>
              <div className="role">{m.role}</div>
              <div className="name">{m.name}</div>
              <div className="bio">{m.bio}</div>
            </article>
          ))}
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* FIT */}
      <section id="fit" className="container-x section section-rule" aria-label="Fit">
        <div className="section-head">
          <div className="eyebrow">
            <span>Fit · Sheet 07</span>
            <span className="right">§ 07</span>
          </div>
          <h2>Where we book the biggest wins.</h2>
          <p className="desc">
            We partner best with operators who see this moment for what it is — and want to move
            while the window is wide open.
          </p>
        </div>
        <RuleEdge variant="top" />

        <div className="fit-grid">
          <div className="fit-col for">
            <div className="fit-head">
              <span className="label">For</span>
              <span className="mark">07.A</span>
            </div>
            <ul className="fit-list">
              {fit.for.map((t) => (
                <li className="fit-item" key={t}>
                  <span className="bull" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fit-col wins">
            <div className="fit-head">
              <span className="label">Wins we book</span>
              <span className="mark">07.B</span>
            </div>
            <ul className="fit-list">
              {fit.wins.map((t) => (
                <li className="fit-item" key={t}>
                  <span className="bull" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x section section-rule" aria-label="FAQ">
        <div className="section-head">
          <div className="eyebrow">
            <span>FAQ · Sheet 08</span>
            <span className="right">§ 08</span>
          </div>
          <h2>Straight answers.</h2>
          <p className="desc">
            Short version: we partner with operators who want AI that delivers measurable wins — fast.
          </p>
        </div>
        <RuleEdge variant="top" />

        <div className="faq-list">
          {faqs.map((f, i) => (
            <details className="faq" key={f.question} open={i === 0}>
              <summary>
                <span className="qidx">Q.{String(i + 1).padStart(2, "0")}</span>
                <span className="q">{f.question}</span>
                <span className="caret">+</span>
              </summary>
              <div className="a">{f.answer}</div>
            </details>
          ))}
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* CTA */}
      <section id="cta" className="container-x section" aria-label="Get started">
        <div className="sheet-sig">
          <span>Sheet 09 / Contact</span>
          <span className="right">Fig. 09 — Next step</span>
        </div>
        <RuleEdge variant="top" />

        <AiWire />

        <div className="cta-band">
          <div className="cta-left">
            <div className="cta-eyebrow">{cta.eyebrow}</div>
            <h2 className="cta-headline">{cta.headline}</h2>
          </div>
          <div className="cta-right">
            <div className="cta-email-row">
              <a className="cta-email" href={`mailto:${site.email}`}>
                <span>{site.email}</span>
                <span className="glyph">→</span>
              </a>
              <a className="cta-email" href="#">
                <span>Schedule intro call</span>
                <span className="glyph">→</span>
              </a>
              <p className="cta-note2">{cta.note}</p>
            </div>
            <div className="cta-kv">
              {cta.kv.map((row) => (
                <div key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RuleEdge variant="bottom" />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container-x">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="mark">{site.brand}</div>
              <div className="tag">{site.positioning}</div>
            </div>
            <nav className="footer-nav" aria-label="Footer">
              {site.footerNav.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="footer-contact">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>
                {site.cities.map((city, i) => (
                  <span key={city}>
                    {city}
                    {i < site.cities.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
          </div>
          <div className="footer-legal">
            <span className="bar">© {now.getFullYear()} {site.brand}</span>
            <span className="right">
              <span>Est. 2025</span>
              <span>Homepage · v. {diagramDate}</span>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
