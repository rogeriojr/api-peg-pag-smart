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
const Acesso_1 = __importDefault(require("../models/Acesso"));
const Trava_1 = __importDefault(require("../models/Trava"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const limiteAvaliacaoMiddleware_1 = require("../middlewares/limiteAvaliacaoMiddleware");
const acutisTecnologia_1 = require("../services/acutisTecnologia");
const tuya_1 = require("../services/tuya");
const router = (0, express_1.Router)();
// A regra de acesso definida pelo Lucas Scarelli é:
// A trava estará SEMPRE LIGADA e ao ser lido o QR Code ela ficará desligada por 30 segundos e ligará novamente
// POST: Cria um novo acesso
router.post('/acessos', limiteAvaliacaoMiddleware_1.limiteAvaliacaoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trava = yield Trava_1.default.findOne({ qrCode: req.body.qrCode });
        if (!trava)
            throw new Error('Trava não encontrada');
        const usuario = yield Usuario_1.default.findOne({ _id: req.body.usuarioId });
        if (!usuario)
            throw new Error('Usuário não encontrado');
        const { status } = req.body;
        if (!status)
            throw new Error("Os seguintes campos não foram informados: status.");
        const acessarAcutisTecnologia = yield (0, acutisTecnologia_1.access)(trava.deviceId, status);
        console.log({ acessarAcutisTecnologia });
        // Se o comando for executado com sucesso
        if ((acessarAcutisTecnologia === null || acessarAcutisTecnologia === void 0 ? void 0 : acessarAcutisTecnologia.success) === true) {
            let agora = new Date();
            agora.setMilliseconds(agora.getMilliseconds() - 3 * 60 * 60 * 1000);
            yield Trava_1.default.findOneAndUpdate({ _id: trava._id }, { deviceStatus: status });
            const acesso = new Acesso_1.default(Object.assign(Object.assign({}, req.body), { travaId: trava._id, data: agora }));
            yield acesso.save();
            return res.status(201).send(acesso);
        }
        return res.send(acessarAcutisTecnologia);
        throw new Error('Erro desconhecido');
    }
    catch (error) {
        res.status(500).send(error.message);
        return;
    }
}));
router.post('/acesso_com_auto_ligamento', limiteAvaliacaoMiddleware_1.limiteAvaliacaoMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qrCode, usuarioId, status } = req.body;
        if (!status)
            throw new Error("Os seguintes campos não foram informados: status.");
        const trava = yield Trava_1.default.findOne({ qrCode });
        if (!trava)
            throw new Error('Trava não encontrada');
        const usuario = yield Usuario_1.default.findOne({ _id: usuarioId });
        if (!usuario)
            throw new Error('Usuário não encontrado');
        // Enviar comando para a Tuya
        const acessarAcutisTecnologia = yield (0, tuya_1.controlDevice)(trava.deviceId, status === 'true');
        // console.log({ acessarAcutisTecnologia });
        if (acessarAcutisTecnologia === null || acessarAcutisTecnologia === void 0 ? void 0 : acessarAcutisTecnologia.success) {
            let agora = new Date();
            agora.setMilliseconds(agora.getMilliseconds() - 3 * 60 * 60 * 1000); // Ajustar para o horário local
            yield Trava_1.default.findByIdAndUpdate(trava._id, { deviceStatus: status });
            const acesso = new Acesso_1.default(Object.assign(Object.assign({}, req.body), { travaId: trava._id, data: agora }));
            yield acesso.save();
            // Agendar a trava para bloquear após 30 segundos
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const secondAcessarAcutisTecnologia = yield (0, tuya_1.controlDevice)(trava.deviceId, false); // Bloquear novamente
                    console.log({ secondAcessarAcutisTecnologia });
                }
                catch (secondError) {
                    console.error('Error in the second request:', secondError);
                }
            }), 30000); // 30 segundos
            return res.status(201).send(acesso);
        }
        return res.send(acessarAcutisTecnologia);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// router.post('/acesso_com_auto_ligamento', limiteAvaliacaoMiddleware, async (req, res) => {
//     try {
//         const trava = await Trava.findOne({ qrCode: req.body.qrCode });
//         if (!trava) throw new Error('Trava não encontrada');
//         const usuario = await Usuario.findOne({ _id: req.body.usuarioId });
//         if (!usuario) throw new Error('Usuário não encontrado');
//         const { status } = req.body;
//         if (!status) throw new Error("Os seguintes campos não foram informados: status.");
//         const acessarAcutisTecnologia: any = await access(trava.deviceId, status);
//         console.log({ acessarAcutisTecnologia });
//         // Se o comando for executado com sucesso
//         if (acessarAcutisTecnologia?.success === true) {
//             let agora = new Date();
//             agora.setMilliseconds(agora.getMilliseconds() - 3 * 60 * 60 * 1000);
//             await Trava.findOneAndUpdate({ _id: trava._id }, { deviceStatus: status });
//             const acesso: IAcesso = new Acesso({ ...req.body, travaId: trava._id, data: agora });
//             await acesso.save();
//             // Set a timeout to send another request after 30 seconds
//             setTimeout(async () => {
//                 try {
//                     const secondAcessarAcutisTecnologia: any = await access(trava.deviceId, 'true');
//                     // Handle the second response if needed
//                     console.log({ secondAcessarAcutisTecnologia });
//                 } catch (secondError) {
//                     console.log('Error in the second request');
//                     console.log(secondError);
//                 }
//             }, 30000); // 30 seconds in milliseconds
//             return res.status(201).send(acesso);
//         }
//         return res.send(acessarAcutisTecnologia);
//     } catch (error: any) {
//         res.status(500).send(error.message);
//     }
// });
// POST: Cria um novo acesso
// router.post('/acessos', limiteAvaliacaoMiddleware, async (req, res) => {
//     try {
//         const trava = await Trava.findOne({ qrCode: req.body.qrCode })
//         if (!trava) throw new Error('Trava não encontrada')
//         const usuario = await Usuario.findOne({ _id: req.body.usuarioId })
//         if (!usuario) throw new Error('Usuário não encontrado')
//         // const acessarIgopass = await axios.post('https://us-central1-igopass-fac72.cloudfunctions.net/ScarelliAPIHomologacao', {
//         const acessarIgopass = await axios.post('https://us-central1-igopass-fac72.cloudfunctions.net/ScarelliAPI', {
//             "qrcode": "https://www.igopass.com.br/painel/#/acesso/" + trava.codigo,
//             "timestamp": new Date().getTime(),
//             "lat": req.body.lat,
//             "long": req.body.long,
//             "accuracy": req.body.accuracy,
//             "reference": "pegpag",
//             "idade": req.body.idade
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'estabelecimento_key': '20wO2akSrqyeZFnifChX',
//                 'user_key': 'VuHUFCpS9bUq7hvBf98aI3jopKL2'
//             }
//         })
//         if (acessarIgopass?.data && acessarIgopass?.data?.code === '0') {
//             let agora = new Date()
//             agora.setMilliseconds(agora.getMilliseconds() - 3 * 60 * 60 * 1000)
//             const acesso: IAcesso = new Acesso({ ...req.body, travaId: trava._id, data: agora });
//             await acesso.save();
//             return res.status(201).send(acesso)
//         }
//         throw new Error('Erro desconhecido')
//     } catch (error: any) {
//         if (error?.response?.data) {
//             console.log(error.response.data)
//             res.status(error.response.status).send(error.response.data)
//             return
//         }
//         res.status(500).send(error.message)
//         return
//     }
// });
// GET: Lista todos os acessos
router.get('/acessos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acessos = yield Acesso_1.default.find()
            .populate('usuarioId')
            .populate('travaId');
        res.status(200).send(acessos.reverse());
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um acesso por ID
router.get('/acessos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acesso = yield Acesso_1.default.findById(req.params.id);
        if (!acesso) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(acesso);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um acesso por ID
router.get('/acessos/trava/:codigoDaTrava', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trava = yield Trava_1.default.findOne({ codigo: req.params.codigoDaTrava });
        if (!trava)
            throw new Error('Trava não encontrada');
        const acessos = yield Acesso_1.default.find({ travaId: trava._id })
            .populate({ path: 'usuarioId', model: 'Usuario' })
            .populate({ path: 'travaId', model: 'Trava' });
        if (!acessos) {
            return res.status(404).send('Acessos não encontrados.');
        }
        res.status(200).send(acessos.reverse());
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET: Obtém um acesso por ID
router.get('/acessos/usuario/:usuarioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield Usuario_1.default.findOne({ _id: req.params.usuarioId });
        if (!usuario)
            throw new Error('Usuário não encontrado');
        const acesso = yield Acesso_1.default.find({ usuarioId: usuario._id })
            .populate({ path: 'usuarioId', model: 'Usuario' })
            .populate({ path: 'travaId', model: 'Trava' });
        if (!acesso) {
            return res.status(404).send('Acessos não encontrados.');
        }
        res.status(200).send(acesso);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT: Atualiza um acesso
router.put('/acessos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acesso = yield Acesso_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!acesso) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(acesso);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta um acesso por ID
router.delete('/acessos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acesso = yield Acesso_1.default.findByIdAndDelete(req.params.id);
        if (!acesso) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
let data = [];
// DELETE: Deleta um acesso por ID
router.post('/webhook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        data.push(req.body);
        // const acesso = await Acesso.findByIdAndDelete(req.params.id);
        // if (!acesso) {
        //     return res.status(404).send('Usuário não encontrado');
        // }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE: Deleta um acesso por ID
router.post('/check/:checkout_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.checkout_id);
        console.log({ data });
        let checkout = data.filter((item) => item.id === req.params.checkout_id);
        checkout = checkout.find((item) => item.status === 'SUCCESSFUL');
        console.log({ checkout: checkout != undefined ? checkout : 'Não encontrado' });
        if (checkout) {
            console.log({ checkout });
            res.status(200).send(checkout);
        }
        else
            res.send({ mensagem: 'Checkout não encontrado' });
    }
    catch (error) {
        console.log({ error });
        res.status(400).send(error.message);
    }
}));
exports.default = router;
