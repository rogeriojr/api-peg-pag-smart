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
const express_1 = require("express");
const Pagamento_1 = __importDefault(require("../models/Pagamento"));
const Projeto_1 = __importDefault(require("../models/Projeto"));
const router = (0, express_1.Router)();
// POST: Cria uma nova pagamento
router.post('/pagamentos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projeto = yield Projeto_1.default.findOne({ _id: req.body.projetoId });
        console.log({ projeto });
        if (projeto) {
            const novoValorPago = projeto.valorPago + req.body.valor;
            const pagamento = new Pagamento_1.default(Object.assign(Object.assign({}, req.body), { valor: req.body.valor }));
            yield pagamento.save();
            yield Projeto_1.default.findOneAndUpdate({ _id: req.body.projetoId }, { valorPago: novoValorPago });
            res.status(201).send(pagamento);
            return;
        }
        res.send({ status: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Lista todas as pagamentos
router.get('/pagamentos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagamentos = yield Pagamento_1.default.find();
        res.status(200).send(pagamentos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém uma pagamento por ID
router.get('/pagamentos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagamento = yield Pagamento_1.default.findById(req.params.id);
        if (!pagamento) {
            return res.status(404).send('Pagamento não encontrada');
        }
        res.status(200).send(pagamento);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém uma pagamento por ID
router.get('/pagamentos/by_project/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const pagamento = yield Pagamento_1.default.find({ projetoId: req.params.id });
        console.log(pagamento);
        if (!pagamento) {
            return res.status(404).send('Pagamento não encontrada');
        }
        res.status(200).send(pagamento);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza uma pagamento
router.put('/pagamentos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagamento = yield Pagamento_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pagamento) {
            return res.status(404).send('Pagamento não encontrada');
        }
        res.status(200).send(pagamento);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta uma pagamento por ID
router.delete('/pagamentos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagamento = yield Pagamento_1.default.findByIdAndDelete(req.params.id);
        if (!pagamento) {
            return res.status(404).send('Pagamento não encontrada');
        }
        res.status(200).send({ message: 'Pagamento deletada com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
