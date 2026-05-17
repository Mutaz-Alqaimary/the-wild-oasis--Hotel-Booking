# The Wild Oasis Website

A customer-facing cabin reservation website built with Next.js App Router. Guests can browse luxury cabins, filter by capacity, view cabin details, sign in with Google, create reservations, and manage their profile and bookings.

Live site: https://the-wild-oasis-website-pi-sand.vercel.app

## Features

- Responsive marketing home page for The Wild Oasis
- Cabin listing with capacity filters stored in the URL
- Dynamic cabin detail pages with generated metadata
- Reservation flow with date selection and guest count
- Google authentication with NextAuth
- Protected account area for profile and reservation management
- Server Actions for booking, profile updates, sign-in, and sign-out
- Supabase-backed cabin, guest, booking, and settings data
- Loading, error, and not-found states for App Router routes

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- NextAuth 5 beta
- Framer Motion
- React Day Picker
- date-fns

## Project Structure

```text
app/
  _components/        Shared route components
  _lib/               Auth, Supabase client, data services, and Server Actions
  _styles/            Global styles
  about/              About page
  account/            Protected guest account routes
  api/                Auth and cabin API routes
  cabins/             Cabin listing, details, and thank-you routes
  login/              Sign-in page
  layout.tsx          Root layout and metadata
  page.tsx            Home page
types/
  next-auth.d.ts      NextAuth session/JWT type extensions
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root and add the required environment variables:

```bash
SUPABASE_URL=
SUPABASE_KEY=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Main Routes

- `/` - Home page
- `/about` - About The Wild Oasis
- `/cabins` - Cabin listing and filters
- `/cabins/[cabinId]` - Cabin details and reservation form
- `/cabins/thankyou` - Reservation confirmation page
- `/login` - Google sign-in page
- `/account` - Protected account dashboard
- `/account/profile` - Guest profile form
- `/account/reservations` - Guest reservations
- `/account/reservations/edit/[bookingId]` - Edit reservation

## Notes

- The app uses Server Components by default and only uses Client Components where browser interactivity is required.
- Reservation and account mutations are handled through Server Actions in `app/_lib/actions.ts`.
- Supabase access is centralized in `app/_lib/data-service.ts` and `app/_lib/supabase.ts`.
- Auth is configured in `app/_lib/auth.ts` and protects account routes through `proxy.ts`.
