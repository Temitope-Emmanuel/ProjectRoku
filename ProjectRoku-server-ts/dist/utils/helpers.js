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
exports.formatPath = exports.traverseDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const traverseDirectory = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fs_1.default.promises.readdir(filePath);
    const { audioFiles, supposedDirectories } = files.reduce((acc, curVal) => {
        const extension = path_1.default.extname(curVal).toLowerCase();
        const currentFilePath = path_1.default.join(filePath, curVal);
        if (path_1.default.basename(currentFilePath).startsWith('.'))
            return acc;
        else if (extension === '.mp3')
            acc.audioFiles.push(currentFilePath);
        else
            acc.supposedDirectories.push(currentFilePath);
        return acc;
    }, { supposedDirectories: [], audioFiles: [] });
    const directories = supposedDirectories.map((itemPath) => __awaiter(void 0, void 0, void 0, function* () {
        const itemStats = yield fs_1.default.promises.lstat(itemPath);
        return itemStats.isDirectory() && (yield (0, exports.traverseDirectory)(itemPath));
    }));
    return Promise.all(directories).then(directories => {
        return ({
            audioFiles: audioFiles.map(file => (0, exports.formatPath)(file)),
            path: filePath,
            directories
        });
    }).catch(err => {
        console.log('this is the error', err);
    });
});
exports.traverseDirectory = traverseDirectory;
const backslashPattern = /\//;
const formatPath = (path) => path.split(backslashPattern).join("\\");
exports.formatPath = formatPath;
