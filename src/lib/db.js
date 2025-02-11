import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.MARIA_DB_HOST  , // Change if using Docker or a remote server
  user: process.env.MARIA_DB_USER,
  password: process.env.MARIA_DB_PASS,
  database: process.env.MARIA_DB_NAME,
  connectionLimit: 10,  // Increase from 5 to 10
  acquireTimeout: 20000,  // Increase timeout from 10000ms to 20000ms
  multipleStatements: true // Allow multiple queries if needed
});

export async function getTickets() {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query("SELECT * FROM tickets");
  } finally {
    if (conn) conn.release();
  }
}

export async function getTicketById(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query("SELECT * FROM tickets WHERE id = ?", [id]);
  } finally {
    if (conn) conn.release();
  }
}

export async function createTicket(title, description, status = "open") {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO tickets (title, description, status) VALUES (?, ?, ?)",
      [title, description, status]
    );
    console.log(result.insertId)
    return result.insertId;
  } finally {
    if (conn) conn.release();
  }
}

export async function updateTicket(id, title, description, status) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "UPDATE tickets SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, id]
    );
    return result.affectedRows;
  } finally {
    if (conn) conn.release();
  }
}

export async function deleteTicket(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM tickets WHERE id = ?", [id]);
    return result.affectedRows;
  } finally {
    if (conn) conn.release();
  }
}
