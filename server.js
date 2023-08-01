if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.use('/', indexRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})