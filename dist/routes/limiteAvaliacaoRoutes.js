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
const LimiteAvaliacao_1 = __importDefault(require("../models/LimiteAvaliacao"));
const router = (0, express_1.Router)();
// GET: Obtém a contagem de avaliações de um usuário em um dia específico
router.get('/limite-avaliacao/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        const limite = yield LimiteAvaliacao_1.default.findOne({
            usuarioId: req.params.userId,
            data: dataAtual
        });
        if (!limite) {
            return res.status(404).send('Limite de avaliação não encontrado para o usuário na data especificada');
        }
        res.status(200).send(limite);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
//  zerar limite de avaliação - teste
router.put('/limite-avaliacao/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        const limite = yield LimiteAvaliacao_1.default.findOneAndUpdate({
            usuarioId: req.params.userId,
            data: dataAtual
        }, { contagem: 0 });
        if (!limite) {
            return res.status(404).send('Limite de avaliação não encontrado para o usuário na data especificada');
        }
        res.status(200).send(limite);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
