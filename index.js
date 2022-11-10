const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.disah5t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const foodCollection = client.db('hungryNaki').collection('foodItems');
        const foodReview = client.db('hungryNaki').collection('foodReview');

        app.post('/services', async (req, res) => {
            const item = req.body;
            const result = await foodCollection.insertOne(item);
            res.send(result);
            // console.log(item);
        })

        app.post('/add-review', async (req, res) => {
            const review = req.body;
            const result = await foodReview.insertOne(review)
            res.send(result)
        })

        app.get('/food-items', async (req, res) => {
            const query = {};
            const cursor = foodCollection.find(query);
            const result = await cursor.limit(3).toArray();
            res.send(result);
        })
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = foodCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/service-details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await foodCollection.findOne(query);
            res.send(service);
        })
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = foodReview.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hungry naki node server running!');
})

app.listen(port, () => {
    console.log(`Hungry naki node server is running on port ${port}`);
})