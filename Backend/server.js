require('dotenv').config();

const requiredEnv = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of requiredEnv) {
  const val = process.env[key];
  if (!val || String(val).trim() === '') {
    console.error(`FATAL: ${key} must be set in the environment (e.g. Render → Environment).`);
    process.exit(1);
  }
}

const { sequelize } = require('./models');

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection OK.');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    if (/password authentication failed/i.test(String(err.message))) {
      console.error(
        'Hint: The password in DATABASE_URL does not match Neon. In the Neon dashboard open your project → Connection details → copy the full URI (or reset the database password and paste the new connection string into Render).'
      );
    }
    process.exit(1);
  }

  const app = require('./app');
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();