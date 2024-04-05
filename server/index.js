const express = require('express')
const router = require('./routes/index.js')
const cors = require('cors')
const PORT = 3001
const app = express()

app.use(express.json())
app.use(cors())
//app.use('/api', itemRouter, boquetRouter,flowerRouter,wrapperRouter,boquetCompositionRouter)
app.use('/api', router)

app.listen(PORT, () => console.log('server started on port ' + PORT))
