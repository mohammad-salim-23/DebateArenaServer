"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./app/routers"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://debatearenafrontend.vercel.app"
    ],
    credentials: true
}));
// Serve static files from uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static(os.tmpdir()));
app.use('/api', routers_1.default);
app.get('/', (req, res) => {
    res.send({ message: 'Alhamdulilah Server is running....' });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
