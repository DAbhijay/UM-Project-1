const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function main() {
  // Neon DB connection URL (copied from Render/Neon).
  // NOTE: This is for local debugging only; don't commit it.
  const url =
    'postgresql://neondb_owner:npg_f3wGZW9ybVCe@ep-winter-wind-aiqvwr9m-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

  const email = 'alice.customer@test.com';
  const plainPassword = 'password123';

  const client = new Client({ connectionString: url });
  await client.connect();

  const r = await client.query(
    "SELECT email, password_hash FROM users WHERE LOWER(email)=LOWER($1::text)",
    [email],
  );

  if (!r.rows[0]) {
    console.log('No user row found for', email);
    await client.end();
    return;
  }

  const { password_hash, role } = r.rows[0];

  const matches = await bcrypt.compare(plainPassword, password_hash);
  console.log(
    JSON.stringify(
      {
        email: r.rows[0].email,
        role: role,
        password_hash_prefix: String(password_hash).slice(0, 15),
        password_hash_suffix: String(password_hash).slice(-10),
        bcrypt_compare_password123: matches,
      },
      null,
      2,
    ),
  );

  await client.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

