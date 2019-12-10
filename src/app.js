const express = require('express')
var cors = require('cors')
const userRouter = require('./routers/user')
const apiRouter = require('./routers/api')

const port = process.env.PORT

require('./db/db')


const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(apiRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})