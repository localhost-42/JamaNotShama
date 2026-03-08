import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,
});

// export const pool = new Pool({
//   host: "151.145.80.244",
//   port: 5432,
//   user: "jns-user",
//   password: "notfuckingshama",
//   database: "jns-db",
//   ssl: false,
// });

// docker run -d --name jns-db --network jns-net -e POSTGRES_USER=jns-user -e POSTGRES_PASSWORD=notfuckingshama -e POSTGRES_DB=jns-db -p 5432:5432 postgres:16

// docker run -d --name jns-db-dev --network jns-net-dev -e POSTGRES_USER=jns-user -e POSTGRES_PASSWORD=jnsdev -e POSTGRES_DB=jns-db -p 5431:5432 postgres:16