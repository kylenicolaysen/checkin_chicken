const express = require('express')
const db = require('../db/db')
const router = express.Router()

// Main page
router.get('/', (req, res) => {
    res.render('checkin-form')
})

// Form response
router.post('/create-checkin', (req, res) => {
    const { location } = req.session
    const { timezone, local_time, destination, return_time, emergency_contact_email, checkin_user_email } = req.body
    console.log(location)
    const result = db.prepare(`
        INSERT INTO checkins (location, return_time, emergency_contact_email, checkin_user_email, created_at)
        VALUES (?, ?, ?, ?, datetime('now'))
    `).run(location, return_time, emergency_contact_email, checkin_user_email)

    const checkinId = result.lastInsertRowid

    const schedule = require('../scheduler')
    schedule(checkinId, return_time, emergency_contact_email, checkin_user_email, location)

    res.redirect(`/checkin/${checkinId}`)
})

// Checkin page
router.get('/checkin/:id', (req, res) => {
    res.render('checkin', { id: req.params.id })
})

// Confirmation page
router.get('/confirmation/:id', (req, res) => {
    const { id } = req.params
    db.prepare(`UPDATE checkins SET checked_in = 1 WHERE id = ?`).run(id)
    res.render('confirmation')
})

module.exports = router
