import 'dotenv/config.js';
import app from './app.js';
import { connectDB, sequelize } from './db/sequelize.js';
import './models/contact.js';
import './models/User.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    const NEED_ALTER = process.env.DB_ALTER === 'true';

    await sequelize.sync(NEED_ALTER ? { alter: true } : undefined);
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err.message);
    process.exit(1);
  }
})();
