import express from "express"
import http from "http"
import mongodb from "mongodb"

const uri = "mongodb+srv://user:user@cluster0.fefhymw.mongodb.net/?retryWrites=true&w=majority"
const app = express()
const server = http.createServer(app);

function strGenerator(count: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length: count }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

const randomLetters = strGenerator(5);
console.log(randomLetters);

let database;
(async ()=>{
    const mongoClient = mongodb.MongoClient;
    const db = await mongoClient.connect(uri)
    database = db.db("url-shortener");
})();


app.post("/r",async (req,res)=>{

})

app.get("/r/:code",async (req,res)=>{
    
})

server.listen(1234)