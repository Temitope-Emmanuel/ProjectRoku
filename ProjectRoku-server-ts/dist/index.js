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
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("./utils/helpers");
dotenv_1.default.config();
const stringText = process.env.TEXT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '1GB' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '1GB' }));
const downloadsFolder = "/Users/mac/Downloads/MessageDissemination"; // Replace with the path to your Downloads folder.
app.get('/list-downloads', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, helpers_1.traverseDirectory)(downloadsFolder);
    res.status(200).json(Object.assign(Object.assign({}, response), { path: downloadsFolder }));
}));
app.get('/download', (req, res) => {
    var _a;
    const filePath = (_a = req.query) === null || _a === void 0 ? void 0 : _a.filePath;
    console.log('this isthe filePath', filePath);
    const stat = fs_1.default.statSync(filePath);
    const fileName = filePath.split('/').pop();
    const fileStream = fs_1.default.createReadStream(filePath);
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', stat.size);
    fileStream.on('data', chunk => {
        res.write(chunk);
    });
    fileStream.on('end', () => {
        res.end();
    });
    fileStream.on('error', err => {
        res.status(500).send('Error reading the file.');
    });
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server!');
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
