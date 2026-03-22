require('dotenv').config();

const requiredEnv = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of requiredEnv) {
  if (!process.env[key] || String(process.env[key]).trim() === '') {
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
    process.exit(1);
  }

  const app = require('./app');
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();