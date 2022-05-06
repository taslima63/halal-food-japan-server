const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const port = process.env.PORT || 5000;
const app = express();


// middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://authUser:T8eM7XnpthrLGT8K@cluster0.araz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const itemCollection = client.db('halal-food-japan').collection('item');

        // get all the data from db
        app.get('/item', async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });
    }
    finally {
    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Halal food server is Running ')
})

app.listen(port, () => {
    console.log('Hello port', port);
})