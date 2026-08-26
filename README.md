# Robert Labayen Website

A responsive portfolio, speaking, and journal website for Robert Labayen.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Google Fonts through `next/font`

The project has no database dependency. Journal content currently lives in
`lib/site-data.ts`, making it straightforward to replace with Firebase later.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

- `npm run dev`: start local development
- `npm run lint`: check code quality
- `npm run build`: create a production build
- `npm run start`: run the production build
