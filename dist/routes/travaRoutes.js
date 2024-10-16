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
const Trava_1 = __importDefault(require("../models/Trava"));
const router = (0, express_1.Router)();
// POST: Cria um novo usuário
router.post('/travas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trava = new Trava_1.default(req.body);
        yield trava.save();
        res.status(201).send(trava);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Lista todos os usuários
router.get('/travas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travas = yield Trava_1.default.find();
        res.status(200).send(travas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um usuário por ID
router.get('/travas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trava = yield Trava_1.default.findById(req.params.id);
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(trava);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um usuário por E-mail
router.get('/travas/codigo/:codigo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var trava = yield Trava_1.default.findOne({ codigo: req.params.codigo });
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(trava);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza um usuário
router.put('/travas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trava = yield Trava_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(trava);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta um usuário por ID
router.delete('/travas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trava = yield Trava_1.default.findByIdAndDelete(req.params.id);
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
