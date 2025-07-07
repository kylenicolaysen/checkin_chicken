//fake scheduler > sendgrid or something to send emails. Also not great to run with settimeout. is this a chronjob? 
function schedule(id, returnTime, emergencyContactEmail, checkinUserEmail, location) {
  const delay = 1000 * 60 * 1; // 1 min for testing

  console.log(`⏳ Timer set for check-in ${id}`)

  setTimeout(() => {
    const db = require('./db/db')
    const row = db.prepare(`SELECT checked_in FROM checkins WHERE id = ?`).get(id)

    if (!row || row.checked_in) return

    console.log(`⚠️ User did NOT check in! Notifying ${emergencyContactEmail}`)
  }, delay)
}

module.exports = schedule
