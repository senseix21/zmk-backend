"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || '5000';
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = client.db('zmk-electrical');
        const servicesCollection = db.collection('services');
        const projectCollection = db.collection('projects');
        console.log('Database connection established successfully!');
        //Get All Products
        app.get('/services', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield servicesCollection.find({}).toArray();
            res.send(result);
        }));
        //get single Product
        app.get('/services/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield servicesCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            res.send(result);
        }));
        //get all projects
        app.get('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield projectCollection.find({}).toArray();
            res.send(result);
        }));
    }
    finally {
    }
});
connectDB().catch((err) => { console.error(err); });
app.get('/', (req, res) => {
    res.send('Hello from ZMK Builder');
});
app.listen(port, () => {
    console.log('listening on port ' + port);
});
