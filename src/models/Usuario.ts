import mongoose, { Document, Schema } from 'mongoose';

export interface IUsuario extends Document {
    nome: string;
    cpf: string;
    urlFoto: string;
    email: string;
    telefone: string;
    senha: string;
    dataDeNascimento: Date;
    tipo: 'comum' | 'adm' | 'dev';
}

const usuarioSchema: Schema = new Schema({
    nome: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    urlFoto: { type: String, required: false, default: null },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: false, default: null },
    dataDeNascimento: { type: Date, required: true },
    tipo: { type: String, enum: ['comum', 'adm', 'dev'], default: 'comum' }
});

export default mongoose.model<IUsuario>('Usuario', usuarioSchema);
