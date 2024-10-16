import axios from 'axios';
import { Router } from 'express';
import { limiteAvaliacaoMiddleware } from '../middlewares/limiteAvaliacaoMiddleware';
import Carteira from '../models/Carteira';
import Usuario, { IUsuario } from '../models/Usuario';

const router = Router();

router.get("/", async (req, res) => {
    res.send("OK")
})

// POST: Cria um novo usuário
router.post('/usuarios', limiteAvaliacaoMiddleware, async (req, res) => {
    try {
        const usuario: IUsuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

// GET: Lista todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).send(usuarios);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por ID
router.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por E-mail
router.get('/usuarios/email/:email', async (req, res) => {
    try {
        var usuario: any = await Usuario.findOne({ email: req.params.email });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por E-mail
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if(!email || !senha) {
            return res.status(500).send({error: 'E-mail ou senha incorretos.'})
        }

        let usuario: any = await Usuario.findOne({ email, senha });
        
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// PUT: Atualiza um usuário
router.put('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// DELETE: Deleta um usuário por ID
router.delete('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;