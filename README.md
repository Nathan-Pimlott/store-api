# Store API

## Installation

-   Run `npm install` to install dependencies.

## Running locally

-   Follow "Installation" to install dependencies.
-   Ensure mySql is running locally.
-   Create a `.env` file `touch .env`
-   Add the below to the .env file and add in your DB credentials

```
DB_DATABASE=store
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_ADDRESS=db_address
DB_DIALECT=mysql
```

-   Run `npm run dev`

## Run unit tests

-   Follow "Installation" to install dependencies.
-   Run `npm test`
