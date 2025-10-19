// backend/knexfile.js
        require('dotenv').config(); // Para leer DATABASE_URL desde .env

        module.exports = {
          development: {
            client: 'pg',
            connection: process.env.DATABASE_URL,
            migrations: {
              directory: './src/db/migrations',
              tableName: 'knex_migrations'
            },
            // seeds: { directory: './src/db/seeds' } // Si planeas usar seeds
          },
          production: {
            client: 'pg',
            connection: {
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false } // Necesario para muchos hostings (ej: Render, Heroku)
            },
            migrations: {
              directory: './src/db/migrations',
              tableName: 'knex_migrations'
            },
          }
        };