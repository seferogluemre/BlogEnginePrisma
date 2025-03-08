import express from 'express'
import category_routes from './routes/category_routes'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/categories', category_routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})