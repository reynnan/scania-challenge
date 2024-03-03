# Scania Challenge by Reynnan Viktor (Ratatouille AI)

With this project I aimed on creating an AI that could help find recipes for my daily life.
Ratatouille AI can help you with fun and easy recipes, telling you all about the recipe ingredients and instructions.

## How to run it

You can use docker or simple install it using `npm` & `npm run dev`, this project is also deployed on the URL: https://scania-challenge.vercel.app/
There is also a small ci-cd github workflow running the simple tests every time we create a PR or commit to remote.

### Using Docker

1. `docker-compose -f docker-compose-dev.yml up -d`
2. Go to localhost:3000

### Using Npm

1. Run `npm install`
2. Once all dependencies are installed do: `npm run dev`
3. Go to localhost:3000

## Tests

To run the tests locally make sure you are running the porject first

### Integration test with Cypress

#### `yarn cypress:open`

Opens the Cypress GUI

#### `yarn cypress:run`

Runs Cypress CLI

## API

You can see how I'm making a request to a LLM in the folder `pages/api`

## Getting Started (default documentation given by NextJS cli)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
