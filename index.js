require('dotenv').config();

const {
  PORT,
  DB_URI,
  DB_NAME,
  USERS_COLLECTION,
  SERVICES_COLLECTION,
} = process.env;

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} = require('mongodb');

const client = new MongoClient(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// //////////////////////////////////////////////////////

app.get('/users', (req, res) => {
  // const order = Number(req.params.order);
  client.connect(async () => {
    const collection = client.db(DB_NAME).collection(USERS_COLLECTION);
    const result = await collection.find({}).toArray();
    client.close();
    res.json(result);
  });
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  client.connect(async () => {
    const collection = client.db(DB_NAME).collection(USERS_COLLECTION);
    const result = await collection.insertOne({ ...newUser });
    res.json(result);
    client.close();
  });
});


app.delete('/users/:id', (req, res) => {
  client.connect(async () => {
    const collection = client.db(DB_NAME).collection(USERS_COLLECTION);
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
    client.close();
    res.json(result);
  });
});