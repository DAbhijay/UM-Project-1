module.exports = {
    username:   process.env.DB_USER           ||      'postgres',
    password:   process.env.DB_PASSWORD       ||      'postgres',
    database:   process.env.DB_NAME           ||      'mhua_db',
    host:       process.env.DB_HOST           ||      'localhost',
    post:       process.env.DB_PORT           ||      5432
};