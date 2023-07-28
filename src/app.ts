import express from 'express'
import db from 'mongoose'
import todoRoutes from './routes/todos'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(json())

app.use(urlencoded({ extended: true }))

app.use('/todos', todoRoutes)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: err.message })
})

db.connect('')
  .then(() => console.log('Connected DB'))
  .catch((err) => console.log(err))

app.listen(3333, () => console.log('Server started on port 3333'))
