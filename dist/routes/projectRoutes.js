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
const Projeto_1 = __importDefault(require("../models/Projeto"));
const router = (0, express_1.Router)();
// POST: Cria uma nova projeto
router.post('/projetos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projeto = new Projeto_1.default(req.body);
        yield projeto.save();
        res.status(201).send(projeto);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Lista todas as projetos
router.get('/projetos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projetos = yield Projeto_1.default.find();
        res.status(200).send(projetos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém uma projeto por ID
router.get('/projetos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projeto = yield Projeto_1.default.findById(req.params.id);
        if (!projeto) {
            return res.status(404).send('Projeto não encontrada');
        }
        res.status(200).send(projeto);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza uma projeto
router.put('/projetos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projeto = yield Projeto_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!projeto) {
            return res.status(404).send('Projeto não encontrada');
        }
        res.status(200).send(projeto);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta uma projeto por ID
router.delete('/projetos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projeto = yield Projeto_1.default.findByIdAndDelete(req.params.id);
        if (!projeto) {
            return res.status(404).send('Projeto não encontrada');
        }
        res.status(200).send({ message: 'Projeto deletada com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
