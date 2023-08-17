import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { MongoClient, ServerApiVersion, ObjectId, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port: string = process.env.PORT || '5000';

app.use(express.json());
app.use(cors());


const uri = process.env.MONGO_URI as string;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connectDB = async (): Promise<void> => {
    try {
        const db: Db = client.db('zmk-electrical');
        const productCollection: Collection<Document> = db.collection('services')
        console.log('Database connection established successfully!')

        //Get All Products
        app.get('/services', async (req: Request, res: Response) => {
            const result = await productCollection.find({}).toArray();
            res.send(result);
        });

        //get single Product
        app.get('/services/:id', async (req: Request, res: Response) => {
            const id = req.params.id;
            const result = await productCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });




    } finally {

    }
}


connectDB().catch((err) => { console.error(err) });

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from ZMK Builder')
});

app.listen(port, () => {
    console.log('listening on port ' + port)
});