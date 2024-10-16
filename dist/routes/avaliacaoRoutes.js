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
const limiteAvaliacaoMiddleware_1 = require("../middlewares/limiteAvaliacaoMiddleware");
const Avaliacao_1 = __importDefault(require("../models/Avaliacao"));
const Carteira_1 = __importDefault(require("../models/Carteira"));
const Oferta_1 = __importDefault(require("../models/Oferta"));
const router = (0, express_1.Router)();
// POST: Cria uma nova avaliação e atualiza a carteira do usuário
router.post('/avaliacoes', limiteAvaliacaoMiddleware_1.limiteAvaliacaoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield Avaliacao_1.default.startSession();
    session.startTransaction();
    try {
        const avaliacao = new Avaliacao_1.default(req.body);
        yield avaliacao.save({ session });
        // verificar se oferta já foi avaliada pelo usuário
        const avaliacaoRealizada = yield Avaliacao_1.default.findOne({ ofertaId: avaliacao.ofertaId, usuarioId: avaliacao.usuarioId });
        if (avaliacaoRealizada) {
            throw new Error('Oferta avaliada anteriormente pelo usuário');
        }
        const oferta = yield Oferta_1.default.findById(avaliacao.ofertaId).session(session);
        const valorAReceber = req.body.usuario.tipo === 'premium' ? 200 : 100;
        if (!oferta) {
            throw new Error('Oferta não encontrada');
        }
        const carteira = yield Carteira_1.default.findOne({ usuarioId: avaliacao.usuarioId }).session(session);
        if (carteira) {
            // carteira.valor += oferta.valor;
            carteira.valor += valorAReceber;
            yield carteira.save({ session });
        }
        else {
            const novaCarteira = new Carteira_1.default({
                usuarioId: avaliacao.usuarioId,
                // valor: oferta.valor
                valor: valorAReceber
            });
            yield novaCarteira.save({ session });
        }
        yield session.commitTransaction();
        res.status(201).send(avaliacao);
    }
    catch (error) {
        yield session.abortTransaction();
        res.status(500).send(error.message);
    }
    finally {
        session.endSession();
    }
}));
// GET: Lista todas as avaliações
router.get('/avaliacoes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avaliacoes = yield Avaliacao_1.default.find().populate('ofertaId usuarioId');
        res.status(200).send(avaliacoes);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém uma avaliação por ID
router.get('/avaliacoes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avaliacao = yield Avaliacao_1.default.findById(req.params.id).populate('ofertaId usuarioId');
        if (!avaliacao) {
            return res.status(404).send('Avaliação não encontrada');
        }
        res.status(200).send(avaliacao);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza uma avaliação
router.put('/avaliacoes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avaliacao = yield Avaliacao_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!avaliacao) {
            return res.status(404).send('Avaliação não encontrada');
        }
        res.status(200).send(avaliacao);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta uma avaliação por ID
router.delete('/avaliacoes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avaliacao = yield Avaliacao_1.default.findByIdAndDelete(req.params.id);
        if (!avaliacao) {
            return res.status(404).send('Avaliação não encontrada');
        }
        res.status(200).send({ message: 'Avaliação deletada com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
