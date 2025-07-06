const Database = require('better-sqlite3')
const db = new Database('checkins.db')

// Setup schema
db.prepare(`
CREATE TABLE IF NOT EXISTS checkins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT,
  return_time TEXT,
  emergency_contact_email TEXT,
  checkin_user_email TEXT,
  created_at TEXT,
  checked_in INTEGER DEFAULT 0
)
`).run()

module.exports = db