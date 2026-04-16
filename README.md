# GameChanger AI Site

First shippable MVP for the GameChanger AI marketing site.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Static-first architecture, ready for Vercel

## Local run
```bash
cd /home/ubuntu/.openclaw/workspace/gamechanger-ai-site && npm run dev
```

## Production check
```bash
cd /home/ubuntu/.openclaw/workspace/gamechanger-ai-site && npm run build
```

## Notes
- Single-page landing page in `src/app/page.tsx`
- Reusable copy/data lives in `src/content/site.ts`
- Shared section heading component lives in `src/components/section-heading.tsx`
- Metadata is configured in `src/app/layout.tsx`
