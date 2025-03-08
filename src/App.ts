import express from 'express'
import category_routes from './routes/category_routes'
import post_routes from './routes/post_routes'
import comment_routes from './routes/comment_routes'
import tag_routes from './routes/tag_routes'
import postTag_routes from './routes/postTag_routes'

const app = express()
const port = 3000

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use('/categories', category_routes)
app.use('/posts', post_routes)
app.use('/comments', comment_routes)
app.use('/tags', tag_routes)
app.use('/posts/:id/tags', postTag_routes)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})