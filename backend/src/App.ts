import express from 'express'
import cors from 'cors'
import category_routes from './routes/category_routes'
import post_routes from './routes/post_routes'
import comment_routes from './routes/comment_routes'
import tag_routes from './routes/tag_routes'
import postTag_routes from './routes/postTag_routes'
import user_routes from './routes/user_routes'
import dotenv from 'dotenv'
import { corsOptions } from './config/corsOption'
import { globalLimiter } from './config/rateLimitConfig'

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(globalLimiter)


app.use('/api/users', user_routes)
app.use('/api/categories', category_routes)
app.use('/api/posts', post_routes)
app.use('/api/comments', comment_routes)
app.use('/api/tags', tag_routes)
app.use('/api/posts', postTag_routes)

app.listen(port, () => {
    console.log(`Sunucu Ayakta!!! ${port}`)
})