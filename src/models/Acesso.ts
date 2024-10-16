import mongoose, { Document, Schema } from 'mongoose';

export interface IAcesso extends Document {
    usuarioId: string;
    travaId: string;
    data: Date;
    lat: string;
    long: string;
}

const acessoSchema: Schema = new Schema({
    usuarioId: { type: String, required: true, ref: 'Usuario' },
    travaId: { type: String, required: true, ref: 'Trava' },
    data: { type: Date },
    lat: { type: String, required: true },
    long: { type: String, required: true },
});

export default mongoose.model<IAcesso>('Acesso', acessoSchema);
