# Phonebook backend

Backend for the Fullstack Open Part 3 phonebook application.

## Setup (MongoDB)

1. Create a MongoDB database (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas)).
2. Copy `.env.example` to `.env` and set `MONGODB_URI` (and optionally `PORT`). Do not commit `.env`.

## Running locally

- `npm start` — run server (requires `MONGODB_URI` in `.env`; port from `PORT` or 3001)
- `npm run dev` — run with auto-restart on file changes

## Command-line database (3.12)

- List all entries: `node mongo.js <password>`
- Add an entry: `node mongo.js <password> <name> <number>`
  Example: `node mongo.js yourpassword "Arto Vihavainen" 045-1232456`
  Do not commit the password; use a `.env` with `MONGODB_URI` or pass the password as argument.

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
