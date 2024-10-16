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
const Carteira_1 = __importDefault(require("../models/Carteira"));
const router = (0, express_1.Router)();
// POST: Cria uma nova carteira
router.post('/carteiras', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carteira = new Carteira_1.default(req.body);
        yield carteira.save();
        res.status(201).send(carteira);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Lista todas as carteiras
router.get('/carteiras', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carteiras = yield Carteira_1.default.find().populate('usuarioId');
        res.status(200).send(carteiras);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém uma carteira por ID
router.get('/carteiras/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carteira = yield Carteira_1.default.findById(req.params.id).populate('usuarioId');
        if (!carteira) {
            return res.status(404).send('Carteira não encontrada');
        }
        res.status(200).send(carteira);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza uma carteira
router.put('/carteiras/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carteira = yield Carteira_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!carteira) {
            return res.status(404).send('Carteira não encontrada');
        }
        res.status(200).send(carteira);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta uma carteira por ID
router.delete('/carteiras/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carteira = yield Carteira_1.default.findByIdAndDelete(req.params.id);
        if (!carteira) {
            return res.status(404).send('Carteira não encontrada');
        }
        res.status(200).send({ message: 'Carteira deletada com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
