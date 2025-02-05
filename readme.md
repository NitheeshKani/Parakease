# Project: Express SQLite Server

This project is a simple server application built using Express.js and SQLite. It provides a RESTful API for managing user data, using Drizzle ORM for database interactions. The server is set up to handle both development and production environments, with an emphasis on ease of setup and use.

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


Note: The project uses SQLite as its database, so you don't need to set up a separate database server.
