import { Pool } from "pg";

export const pool = new Pool({
  host: "151.145.88.80",
  port: 5432,
  user: "jns-user",
  password: "notfuckingshama",
  database: "jns-db",
  ssl: false,
});
