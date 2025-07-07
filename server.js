const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const path = require('path')

const port = process.env.PORT
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: true
}))

app.engine('hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', routes)

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})