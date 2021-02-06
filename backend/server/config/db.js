module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: process.env.DB_CONNECTION_MAX || 10,
  idleTimeoutMillis: process.env.DB_CONNECTION_IDLE_TIMEOUT || 10000,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 0,
};
