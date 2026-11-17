<<<<<<< HEAD
# Tanmay Kudale – MERN Portfolio

MongoDB + Express + React (Vite) + Node.js, with Framer Motion animations.

## Run locally
1. Install Node.js 18+ and create a free MongoDB Atlas cluster (or run local MongoDB).
2. `cp server/.env.example server/.env` and paste your `MONGO_URI`.
3. `npm run install:all`
4. `npm run dev`
   - Site: http://localhost:5173
   - API:  http://localhost:5000/api/health

The contact form saves messages in MongoDB (`messages` collection). Projects load from `/api/projects`
(seeded automatically on first start). If the API or database is down, the site still shows the built-in data.

## Edit your content
- `client/src/data.js`: name, links, skills, experience, services, fallback projects
- `client/src/styles.css`: colours (see `:root`)
- Replace `client/public/Tanmay_Kudale.pdf` with your latest resume.

## Deploy (one server serves everything)
1. `npm run build` (creates `client/dist`)
2. Deploy the repo to Render/Railway, build command `npm run install:all && npm run build`, start command `npm start`
3. Set env vars `MONGO_URI` and `NODE_ENV=production`.
=======
# Tanmay_Kudale_portfolio
>>>>>>> 5f3ae2546871d715684e43d3bd3245b80513dff1
