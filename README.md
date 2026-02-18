# Phonebook backend

Backend for the Fullstack Open Part 3 phonebook application.

## Setup (MongoDB)

**Local MongoDB:** Install [MongoDB Community](https://www.mongodb.com/try/download/community) and start it, then copy `.env.example` to `.env` (uses `mongodb://localhost:27017/phonebook` by default).

**Atlas (cloud):** Create a cluster at [MongoDB Atlas](https://www.mongodb.com/atlas), then set `MONGODB_URI` in `.env` to your connection string.

Do not commit `.env`.

## Running locally

- `npm start` — run server (requires `MONGODB_URI` in `.env`; port from `PORT` or 3001)
- `npm run dev` — run with auto-restart on file changes

## Command-line database (3.12)

With `MONGODB_URI` in `.env` (e.g. local: `mongodb://localhost:27017/phonebook`):

- List all: `node mongo.js local` (use any word for local DB)
- Add one: `node mongo.js local "Arto Vihavainen" 045-1232456`

## API

- `GET /api/persons` — list all entries
- `GET /api/persons/:id` — get one entry
- `POST /api/persons` — add entry (body: `{ name, number }`)
- `DELETE /api/persons/:id` — delete entry
- `GET /info` — info page (count + time)

## Deployed application

**Live app:** [Add your Fly.io or Render URL here after deployment]

After deploying to Fly.io or Render, replace the text above with the actual URL and remove this sentence.

## Full-stack production build (3.11, 3.21)

To build the frontend and serve it from this backend:

```bash
npm run build:ui
```

Then run the backend and open `http://localhost:3001` to verify. Push to Fly.io/Render to deploy the full-stack app (set `MONGODB_URI` in the host's environment). Do not deploy the frontend separately; the backend serves the built frontend from `dist/`.

## Lint (3.22)

```bash
npm run lint
```
