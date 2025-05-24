# 🚗 ParkEase – Smart Parking, Decentralized

**Turn any empty space into a parking spot.**

**ParkEase** is a fullstack app where anyone can list unused space as a parking spot, and drivers can search and book nearby spaces in real time. It’s my **first fullstack project**, built with:

* **Frontend**: SvelteKit + Tailwind CSS
* **Backend**: Express.js
* **Database**: SQLite with Drizzle ORM

---

## 🛠️ Features

* 🅿️ List your space as a parking spot
* 🔍 Search and book available spots
* ⏱️ Avoid double bookings with time-based reservations
* *(Planned)* Payments and map-based search

---

## 🚀 Stack

* SvelteKit (frontend & routing)
* Tailwind CSS (UI)
* Express.js (backend API)
* SQLite + Drizzle (DB + ORM)

---
## Features

- **Express.js**: A minimal and flexible Node.js web application framework.
- **SQLite**: A self-contained, high-reliability, embedded SQL database engine.
- **Drizzle ORM**: A lightweight ORM for TypeScript and JavaScript that simplifies database operations.
- **CORS**: Enabled for handling cross-origin requests.
- **TypeScript**: Provides static typing to improve code quality and maintainability.

Follow the setup instructions below to get started with the project.


# Setting up the project

After cloning the project, follow these steps to set it up:

1. Run `npm install` to install all the dependencies.
2. Run `npm run db:setup` to set up the database.
3. Run `npm run db:view` to view the database schema.
4. Run `npm run dev` to start the server in development mode.
5. Open a web browser and navigate to `http://localhost:8080/` to view the API.


# The Directiories

1. `src/database/migration` holds the migration scripts
2. `src/database/schema` holds all the schema that needs to be created
3. `src/router` holds all the api routes *** note the routers shoud be added to the index.ts ***

# Deploying to a server

1. Run `npm run build` to build the TypeScript code.
2. Copy the `dist` folder to your server.
3. Run `npm install` in the `dist` folder to install the dependencies.
4. Run `node dist/index.js` to start the server.

## Useful Tutorials

1. Setup   : https://www.youtube.com/watch?v=L0y6HivSk5c&list=PL2T7gva8ajyiycYSdy8_RrTB1U69iqUfH
2. Drizzle : https://www.youtube.com/watch?v=7-NZ0MlPpJA
3. Express : https://www.youtube.com/watch?v=SccSCuHhOw0

Note: The project uses SQLite as its database, so you don't need to set up a separate database server.
