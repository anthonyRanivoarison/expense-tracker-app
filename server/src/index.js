import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello from expense tracker api")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))