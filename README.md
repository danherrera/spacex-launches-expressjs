# SpaceX Launches REST API with NodeJS and Postgres

## Endpoints

### SpaceX Launches Endpoints

* `/launches` (GET) - Returns list of launches. A launch consists of:
  - `id` (integer): Launch flight number.
  - `rocket_name` (non-null 50-character string): Name of the rocket.
  - `rocket_type` (non-null 50-character string): Type of rocket.
  - `launch_date` (non-null ISO8601 timestamp string): Date of the launch.
  - `details` (non-null string): Any additional details about launch, if any.
  - `article_link` (non-null string): Link to the article.
  - `reddit_launch_link` (non-null string): Link to reddit launch post, if available.
* `/launches/:id` (GET) - Returns single launch with given id. `200` HTTP status code if successful; `404` if not found.
* `/launches` (POST) - Creates launch. Launch properties supplied via request body. The only optional field is `id` (will generate one if missing).
* `/launches/:id` (PATCH) - Updates launch with provided id with the provided launch properties in the request body.
* `/launches/:id` (DELETE) - Deletes launch with provided id.
* `/launches` (DELETE) - Deletes all launches.
* `/setup` (GET) - Runs setup procedure of clearing, and then populating the database.

## Developement Setup

### Prerequisites

* NPM
* NodeJS
* PostgreSQL

### Set up database 

* Run `npm run devSetup` to:
  - Create and connect to a PostgreSQL database named `spacex_launches`.
  - Create a table named `launch`.
  - Create a default `.env` file with environment variables for connecting to the database. This file may require updating to properly connect to database from the application.

### Run application

* Run `npm run devStart` to start application. On first start, if all goes well, there should be the following output:

```bash
Server started
Connected to database successfully
Clearing database...
Populating database...
Populated database!
Completed setup
```