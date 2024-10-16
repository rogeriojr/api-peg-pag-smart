import axios from 'axios';
import { Router } from 'express';
import Carteira from '../models/Carteira';
import Trava, { ITrava } from '../models/Trava';

const router = Router();

// POST: Cria um novo usuário
router.post('/travas', async (req, res) => {
    try {
        const trava: ITrava = new Trava(req.body);
        await trava.save();
        res.status(201).send(trava);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Lista todos os usuários
router.get('/travas', async (req, res) => {
    try {
        const travas = await Trava.find();
        res.status(200).send(travas);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por ID
router.get('/travas/:id', async (req, res) => {
    try {
        const trava = await Trava.findById(req.params.id);
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(trava);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por E-mail
router.get('/travas/codigo/:codigo', async (req, res) => {
    try {
        var trava: any = await Trava.findOne({ codigo: req.params.codigo });
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(trava);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// PUT: Atualiza um usuário
router.put('/travas/:id', async (req, res) => {
    try {
        const trava = await Trava.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(trava);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// DELETE: Deleta um usuário por ID
router.delete('/travas/:id', async (req, res) => {
    try {
        const trava = await Trava.findByIdAndDelete(req.params.id);
        if (!trava) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;