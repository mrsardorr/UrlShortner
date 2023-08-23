import express from "express"
import * as http from 'http'
import * as mongodb from "mongodb"

const uri = "mongodb+srv://user:user@cluster0.fefhymw.mongodb.net/?retryWrites=true&w=majority"
const app = express()
const server = http.createServer(app);

function strGenerator(count: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length: count }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

app.use(express.text({type:"*/*"}))
app.use(express.static(__dirname))


let database:any;
(async ()=>{
    const mongoClient = mongodb.MongoClient;
    const db = await mongoClient.connect(uri)
    database = db.db("url-shortener");
})();


app.post("/r",async (req,res)=>{
    const url = req.body
    const code = strGenerator(5);
    const obj = {url,code};
    await database.collection("urls").insertOne(obj);
    res.send(obj)
})

app.get("/r/:code",async (req,res)=>{
    const code = req.params.code;
    const result = await database.collection("urls").findOne({code});
    res.redirect(result.url)
})

server.listen(1234)