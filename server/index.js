const express = require('express')
const router = require('./routes/index.js')
const authRouter = require('./routes/auth.routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = 3001
const app = express()
const corsConfig = {
	credentials: true,
	origin: true
}
app.use(express.json())
//app.use(cors())
app.use(cookieParser())
app.use(cors(corsConfig))
//app.use('/api', itemRouter, boquetRouter,flowerRouter,wrapperRouter,boquetCompositionRouter)
app.use('/api', [router,authRouter])

app.listen(PORT, () => console.log('server started on port ' + PORT))
