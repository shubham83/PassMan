const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const dbName = 'PassMan';
const app = express() 
const port = 3000
app.use(cors())
app.use(bodyParser.json())


client.connect();


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.send({ success: true,result: findResult })
})
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.send({ success: true,result: findResult })
})

app.listen(port, () => {
    console.log(`Server is Online`)
})
