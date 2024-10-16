import express from 'express';
import cors from 'cors'; 
import mongoose from 'mongoose';
import usuarioRoutes from './routes/usuarioRoutes';
import carteiraRoutes from './routes/carteiraRoutes';
import avaliacaoRoutes from './routes/avaliacaoRoutes';
import ofertaRoutes from './routes/ofertaRoutes';
import limiteAvaliacaoRoutes from './routes/limiteAvaliacaoRoutes';
import projectRoutes from './routes/projectRoutes';
import pagamentoRoutes from './routes/pagamentoRoutes';
import travaRoutes from './routes/travaRoutes';
import acessoRoutes from './routes/acessoRoutes';

const app = express();
// Ativando o CORS para todas as rotas
app.use(cors());

mongoose.connect('mongodb+srv://pegpagsmart24h:hGeyQKWWWcq6WEFX@pegpag.kqjvheg.mongodb.net/?retryWrites=true&w=majority', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: 'pegpag'
});

app.use(express.json());
app.use(usuarioRoutes);
app.use(carteiraRoutes);
app.use(avaliacaoRoutes);
app.use(ofertaRoutes);
app.use(limiteAvaliacaoRoutes);
app.use(projectRoutes);
app.use(pagamentoRoutes);
app.use(travaRoutes);
app.use(acessoRoutes);

export default app;
