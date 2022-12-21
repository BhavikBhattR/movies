if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: './config.env'})
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

app.set("view engine", "ejs")
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser : true})
const db = mongoose.connection
db.on('error', error => console.error(`error is ${error}`))
db.once('open', ()=> console.log('connected to mongodb'))

const indexRouter = require("./routes/index")
app.use('/', indexRouter)

const authorRouter = require("./routes/authors")
app.use('/authors', authorRouter)

const bookRouter = require("./routes/books")
app.use('/books', bookRouter)


app.listen(process.env.PORT || 3000)






