import express, {Express, NextFunction, Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import HomeRoutes from './routes/home.routes'

const app: Express = express()
dotenv.configDotenv()

const port = process.env.PORT || 3000

app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(HomeRoutes)

app.use('/test', (_req: Request, _res: Response) => {
  _res.status(200).send('Account API is up')
})

app.use((err: Error, _req: Request, _res: Response, _next: NextFunction) => {
  console.log(err.stack)
  _res.status(500).send(err.message)
})

app.listen(port, () => {
  console.log(`account api is up and listening on port ${port}`)
  if (!process.env.TOKEN_URL) {
    throw new Error("TOKEN_URL environment variable missing")
  }
  if (!process.env.FI_URL) {
    throw new Error("FI_URL environment variable missing")
  }

})