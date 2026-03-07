import { Pool } from "pg";

export const pool = new Pool({
  host: "151.145.80.244",
  port: 5432,
  user: "jns-user",
  password: "notfuckingshama",
  database: "jns-db",
  ssl: false,
});
