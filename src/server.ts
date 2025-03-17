import express, { Request, Response } from "express"
import routes from './routes'
import loggerMiddleware from "./loggerMiddleware"

const app = express()
const port = process.env.PORT || 3001;

app.use(loggerMiddleware) 

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(express.static('public'))
app.use(routes)

app.listen(port, (err)=> {
    if(err){
        console.log(err)
        return
    }

    console.log(`listen to port ${port}`)
})