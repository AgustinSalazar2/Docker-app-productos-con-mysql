import mysql2 from 'mysql2'

function createConnection() {
    const connection = mysql2.createConnection({
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'agus1',
        database: process.env.DATABASE_NAME || 'test'
    })
    return connection
}

async function createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS productos (
      id INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(100) NOT NULL,
      precio FLOAT NOT NULL,
      PRIMARY KEY (id)
    )
  `
    const connDB = createConnection()
    return await connDB.promise().query(sql)
}

export {
    createConnection,
    createTable
}