# e-Study
Hosted at: https://e-study-production.up.railway.app/about-us

## Stack

> Node.js v16 LTS is recommended

_Backend API_

- express.js (v4.18.2)
- sequelize.js (v6.25.2)
- PostgreSQL (v14 recommended)

_Frontend React client_

- Based on `create-react-app`
  - pre-configured to work with the api
- Bootstrap (v5)
  - added to `/client/public/index.html`
- React Router (v6)

## Development Setup

Each team member will need to do this on their local machine.

### Ensure you have PostgreSQL installed

- Check if you have PostgreSQL installed
  - ✅ versions 10-14 should work
  - 🚫 version 15 has not been tested

### Create a PostgreSQL user and database

The project-starter template expects the following for local development:

- PostgreSQL User/Role
  - name: `team-meeter`
  - password: `ctp2022`
- PostgreSQL Database
  - name: `estudy`

#### For Windows/pgAdmin users

If you are on Windows and installed **pgAdmin** follow our [pgAdmin guide](https://github.com/CUNYTechPrep/guides/blob/master/pgAdmin-create-user-db.md) to create a user in PostgreSQL named `team-meeter` with the password `ctp2022` and a database named `estudy`.

#### For Mac/Linux users

Create a user in PostgreSQL named `team-meeter` with the password `ctp2022`:

> This only needs to be done one time on your machine
> You can create additional users if you want to.

```
createuser -P -s -e team-meeter
```

Create a separate db for this project:

```
createdb -h localhost -U team-meeter estudy
```

### Running the app locally

For local development you will need two terminals open, one for the api-backend and another for the react-client.

_Clone_ this app, then:

```bash
# api-backend terminal 1
cp .env.example .env
npm install
npm run dev
```

```bash
# react-client terminal 2
cd client
npm install
npm start
```

- api-backend will launch at: http://localhost:8080
- react-client will launch at: http://localhost:3000
- api documentation will be at: http://localhost:8080/api-docs

> In production you will only deploy a single app. The react client will build into static files that will be served from the backend.
