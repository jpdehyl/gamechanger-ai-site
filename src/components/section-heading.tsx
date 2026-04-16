type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="grid gap-5 max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1749ff]">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-[1.08] text-black md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-7 text-black/60 md:text-lg">{description}</p>
      )}
    </div>
  );
}
