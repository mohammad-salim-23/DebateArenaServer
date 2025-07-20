"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
// Storage configuration
const storage = multer_1.default.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "uploads/debates/"); // or your desired folder
    // },
    destination: (req, file, cb) => {
        const tempDir = os_1.default.tmpdir();
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed!"));
    }
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
