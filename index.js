import 'dotenv/config.js';
import app from './app.js';
import { connectDB, sequelize } from './db/sequelize.js';
import './models/contact.js';

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
})();
