type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="grid gap-4 border-b-4 border-black pb-6 md:grid-cols-[140px_minmax(0,1fr)] md:items-start">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1749ff]">{eyebrow}</p>
      <div className="grid gap-3">
        <h2 className="max-w-3xl text-3xl font-semibold uppercase tracking-[-0.04em] text-black md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-black/72 md:text-lg">{description}</p>
      </div>
    </div>
  );
}
