import mongoose, { Document, Schema } from 'mongoose';

export interface ITrava extends Document {
    nome: string;
    nomeMercado: string;
    usuarios: [];
    qrCode: string;
    codigo: string;
    deviceId: string;
    status: 'ativa' | 'inativa'; // Se a trava está ativa ou inativa no sistema (ex: a trava pode ser cadastrada mas ser deixada inativa até ser colocada em um ponto de uso)
    deviceStatus: 'online' | 'offline'; // Se a trava está online ou offline 
    powerStatus: 'on' | 'off'; // Se a trava está ligada ou desligada 
}

const travaSchema: Schema = new Schema({
    nome: { type: String, required: true },
    nomeMercado: { type: String, required: true },
    usuarios: { type: Array, required: true },
    deviceId: { type: String, required: true, unique: true },
    codigo: { type: String, required: true, unique: true },
    qrCode: { type: String, required: true, unique: true },
    status: { type: String, default: 'ativa' },
    deviceStatus: { type: String, default: 'online' },
    powerStatus: { type: String, default: 'on' },
});

export default mongoose.model<ITrava>('Trava', travaSchema);
