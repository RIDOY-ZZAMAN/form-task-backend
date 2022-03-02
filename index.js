const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 5000;

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r53mt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('Form');
        const dataCollection = database.collection('data');
        console.log("Database connected");

        //GET API
        app.get('/', (req, res) => {
            res.send("Hello from the Assignment");

        })

        //Getting DATA
        app.get('/data', async (req, res) => {
            const cursor = dataCollection.find({});
            const data = await cursor.toArray();
            res.send(data);

        })

        //POST METHOD FOR CREATING DATA
        app.post('/data', async (req, res) => {
            const data = req.body;
            const result = await dataCollection.insertOne(data);
            res.json(result)

        })





    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log("Listening to port", port)
})