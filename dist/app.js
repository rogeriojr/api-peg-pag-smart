"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const carteiraRoutes_1 = __importDefault(require("./routes/carteiraRoutes"));
const avaliacaoRoutes_1 = __importDefault(require("./routes/avaliacaoRoutes"));
const ofertaRoutes_1 = __importDefault(require("./routes/ofertaRoutes"));
const limiteAvaliacaoRoutes_1 = __importDefault(require("./routes/limiteAvaliacaoRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const pagamentoRoutes_1 = __importDefault(require("./routes/pagamentoRoutes"));
const travaRoutes_1 = __importDefault(require("./routes/travaRoutes"));
const acessoRoutes_1 = __importDefault(require("./routes/acessoRoutes"));
const app = (0, express_1.default)();
// Ativando o CORS para todas as rotas
app.use((0, cors_1.default)());
mongoose_1.default.connect('mongodb+srv://pegpagsmart24h:hGeyQKWWWcq6WEFX@pegpag.kqjvheg.mongodb.net/?retryWrites=true&w=majority', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: 'pegpag'
});
app.use(express_1.default.json());
app.use(usuarioRoutes_1.default);
app.use(carteiraRoutes_1.default);
app.use(avaliacaoRoutes_1.default);
app.use(ofertaRoutes_1.default);
app.use(limiteAvaliacaoRoutes_1.default);
app.use(projectRoutes_1.default);
app.use(pagamentoRoutes_1.default);
app.use(travaRoutes_1.default);
app.use(acessoRoutes_1.default);
exports.default = app;
