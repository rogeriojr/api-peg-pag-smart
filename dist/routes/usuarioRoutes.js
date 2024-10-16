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
const Usuario_1 = __importDefault(require("../models/Usuario"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("OK");
}));
// POST: Cria um novo usuário
router.post('/usuarios', limiteAvaliacaoMiddleware_1.limiteAvaliacaoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = new Usuario_1.default(req.body);
        yield usuario.save();
        res.status(201).send(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}));
// GET: Lista todos os usuários
router.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuario_1.default.find();
        res.status(200).send(usuarios);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um usuário por ID
router.get('/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield Usuario_1.default.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um usuário por E-mail
router.get('/usuarios/email/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuario = yield Usuario_1.default.findOne({ email: req.params.email });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um usuário por E-mail
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(500).send({ error: 'E-mail ou senha incorretos.' });
        }
        let usuario = yield Usuario_1.default.findOne({ email, senha });
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }
        res.status(200).send(usuario);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza um usuário
router.put('/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield Usuario_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta um usuário por ID
router.delete('/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield Usuario_1.default.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
