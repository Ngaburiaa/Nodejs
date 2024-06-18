import express from "express"
const app =express()
import route from "./routes/eventRoute.mjs"

app.use(route)


app.listen( process.env.port ||3000,()=>{
    console.log("Server running on port 3000")
})