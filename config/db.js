import pg from 'pg'
const { Pool, Client } = pg

const connectionString = process.env.CONEXION

const pool = new Pool({
    connectionString: process.env.CONEXION,
    ssl: {
        rejectUnauthorized: false,
    },
})

export default pool