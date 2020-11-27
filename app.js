const express = require('express')
const shortId = require('shortid')
const createHttpError = require('http-errors') // handling the errors for bad requests and rerouting them
const mongoose = require('mongoose')
const path = require('path')
const ShortUrl = require('./models/modelUrl')


const app = express()



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


mongoose.connect('mongodb://localhost:27017',
{
    dbName: 'url-shortner',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    //removing the depraction warnings 
  })
  .then(() => console.log('Mongo Online!'))
  .catch((error) => console.log('Err x_x'))


app.get('/', async (req, res, next) => {
  res.render('index')
})


//post method handling
app.post('/', async (req, res, next) => {
  try {
    const { url } = req.body
    if (!url) {
      throw createHttpError.BadRequest('valid url required')
    }
    const urlinDB = await ShortUrl.findOne({ url }) //if url exists in mongo
    if (urlinDB) {
      res.render('index', {short_url: `http://localhost:5650/${urlinDB.shortId}`})
      return
    }
    const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
    const result = await shortUrl.save()
    res.render('index', {short_url: `http://localhost:5650/${result.shortId}`});
  } catch (error) {
    next(error)
  }
})

app.get('/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params
    const result = await ShortUrl.findOne({ shortId })
    if (!result) {
      throw createHttpError.NotFound('There is not Short url for this')
    }
    res.redirect(result.url)
  } catch (error) {
    next(error)
  }
})

app.use((req, res, next) => {
  next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)// internal server error
  res.render('index', { error: err.message })
})

app.listen(5650, () => console.log('Server online'))