import { Sequelize } from 'sequelize';
import pg from 'pg';
import 'dotenv/config.js';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, NODE_ENV } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  dialect: 'postgres',
  dialectModule: pg,
  logging: NODE_ENV !== 'production',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
}
