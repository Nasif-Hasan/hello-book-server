const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.port || 5000;

// middle wares
app.use(cors())
app.use(express.json())

const posts = require('./data/posts.json')

app.get('/posts', (req, res) => {
    res.send(posts)
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6hbbzqn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const postCollection = client.db('helloBook').collection('posts')

        app.post('/posts', async(req, res) => {
            const post = req.body
            console.log(post);
            const result = await postCollection.insertOne(post)
        })

    }
    finally {

    }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send("server running")

})

app.get("/allpost")

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})