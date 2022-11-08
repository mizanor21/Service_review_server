const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.get('/food-items', async (req, res) => {
            const query = {};
            const cursor = foodCollection.find(query);
            const result = await cursor.limit(3).toArray();
            console.log(result)
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