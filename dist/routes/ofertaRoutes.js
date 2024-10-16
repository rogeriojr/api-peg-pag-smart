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
const Avaliacao_1 = __importDefault(require("../models/Avaliacao"));
const Oferta_1 = __importDefault(require("../models/Oferta"));
const router = (0, express_1.Router)();
// POST: Cria uma nova oferta
router.post('/ofertas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = new Oferta_1.default(req.body);
        yield oferta.save();
        res.status(201).send(oferta);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Lista todas as ofertas
router.get('/ofertas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield Oferta_1.default.find();
        res.status(200).send(ofertas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém uma oferta por ID
router.get('/ofertas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield Oferta_1.default.findById(req.params.id);
        if (!oferta) {
            return res.status(404).send('Oferta não encontrada');
        }
        res.status(200).send(oferta);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém as ofertas por ID
router.get('/ofertas/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avaliacoes = yield Avaliacao_1.default.find({ usuarioId: req.params.id });
        var ofertaIds = avaliacoes.map((avaliacao) => avaliacao.ofertaId);
        const ofertas = yield Oferta_1.default.find({ _id: { $nin: ofertaIds } });
        if (!ofertas) {
            // Ofertas não encontradas
            return res.status(200).send([]);
        }
        res.status(200).send(ofertas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza uma oferta
router.put('/ofertas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield Oferta_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!oferta) {
            return res.status(404).send('Oferta não encontrada');
        }
        res.status(200).send(oferta);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta uma oferta por ID
router.delete('/ofertas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield Oferta_1.default.findByIdAndDelete(req.params.id);
        if (!oferta) {
            return res.status(404).send('Oferta não encontrada');
        }
        res.status(200).send({ message: 'Oferta deletada com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
