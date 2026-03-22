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

async function connectDbWithRetries(maxAttempts = 6, delayMs = 2000) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await sequelize.authenticate();
      console.log('Database connection OK.');
      return;
    } catch (err) {
      lastErr = err;
      const msg = String(err.message);
      if (/password authentication failed/i.test(msg)) {
        console.error('Database connection failed:', msg);
        console.error(
          'Fix: Render → DATABASE_URL must match Neon → Connection details (copy full URI; reset password if needed).'
        );
        process.exit(1);
      }
      console.error(`Database connect attempt ${attempt}/${maxAttempts}:`, msg);
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  console.error('Database connection failed after retries:', lastErr?.message);
  process.exit(1);
}

async function start() {
  await connectDbWithRetries();

  const app = require('./app');
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();