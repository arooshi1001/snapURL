require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Url = require('./models/Url')

const app = express()

/* ---------------- RATE LIMITER ---------------- */

const rateLimitMap = {}

function rateLimiter(req, res, next) {
  const ip = req.ip
  const now = Date.now()

  if (!rateLimitMap[ip]) {
    rateLimitMap[ip] = []
  }

  // keep only requests from last 60 seconds
  rateLimitMap[ip] = rateLimitMap[ip].filter(
    time => now - time < 60000
  )

  if (rateLimitMap[ip].length >= 5) {
    return res.status(429).send('Too many requests. Try again later.')
  }

  rateLimitMap[ip].push(now)
  next()
}

/* ---------------- APP SETUP ---------------- */

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

/* ---------------- ROUTES ---------------- */

// Home – show only active URLs
app.get('/', async (req, res) => {
  const urls = await Url.find({
    expiresAt: { $gt: new Date() }
  }).sort({ _id: -1 })

  const baseUrl = `${req.protocol}://${req.get('host')}`

  res.render('index', {
    urls,
    baseUrl
  })
})


// Shorten URL (rate-limited + idempotent)
app.post('/shorten', rateLimiter, async (req, res) => {
  const { fullUrl } = req.body
  if (!fullUrl) return res.redirect('/')

  // Check if URL already exists and is still valid
  const existing = await Url.findOne({
    fullUrl,
    expiresAt: { $gt: new Date() }
  })

  if (existing) {
    return res.redirect('/')
  }

  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 7)

  await Url.create({
    fullUrl,
    expiresAt: expiryDate
  })

  res.redirect('/')
})

// Redirect
app.get('/:code', async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code })

  if (!url) return res.sendStatus(404)

  if (url.expiresAt < new Date()) {
    return res.status(410).send('This link has expired')
  }

  url.clicks++
  await url.save()

  res.redirect(url.fullUrl)
})

/* ---------------- SERVER ---------------- */

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)
