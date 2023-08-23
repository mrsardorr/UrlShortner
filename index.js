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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongodb_1 = __importDefault(require("mongodb"));
const uri = "mongodb+srv://user:user@cluster0.fefhymw.mongodb.net/?retryWrites=true&w=majority";
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
function strGenerator(count) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length: count }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}
app.use(express_1.default.text({ type: "*/*" }));
app.use(express_1.default.static(__dirname));
let database;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongoClient = mongodb_1.default.MongoClient;
    const db = yield mongoClient.connect(uri);
    database = db.db("url-shortener");
}))();
app.post("/r", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body;
    const code = strGenerator(5);
    const obj = { url, code };
    yield database.collection("urls").insertOne(obj);
    res.send(obj);
}));
app.get("/r/:code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.params.code;
    const result = yield database.collection("urls").findOne({ code });
    res.redirect(result.url);
}));
server.listen(1234);
