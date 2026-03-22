const { Sequelize } = require('sequelize');

/** Trim and strip accidental wrapping quotes (common when pasting into Render). */
function normalizeDatabaseUrl(raw) {
  if (raw == null) return raw;
  let url = String(raw).trim();
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }
  return url;
}

/** Neon often adds channel_binding=require; node-postgres can fail auth with it — drop it. */
function prepareDatabaseUrl(raw) {
  const normalized = normalizeDatabaseUrl(raw);
  if (!normalized) return normalized;
  try {
    const u = new URL(normalized);
    u.searchParams.delete('channel_binding');
    return u.toString();
  } catch {
    return normalized.replace(/[?&]channel_binding=[^&]*/g, '').replace(/\?&/, '?');
  }
}

const databaseUrl = prepareDatabaseUrl(process.env.DATABASE_URL);

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: { max: 5, min: 0, acquire: 60000, idle: 10000 },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;