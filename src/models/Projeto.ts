import mongoose, { Document, Schema } from 'mongoose';

export interface IProjeto extends Document {
    titulo: string;
    descricao: string;
    valor: number;
    valorPago: number;
    status: string;
    dataDeInicio: string;
    dataDeEntrega: string;
}

const projetoSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, default: "" },
    valor: { type: Number, required: true },
    valorPago: { type: Number, default: 0 },
    status: { type: String, default: 'em_andamento' },
    dataDeInicio: { type: String, default: Date.now },
    dataDeEntrega: { type: String, default: '' }
});

export default mongoose.model<IProjeto>('Projeto', projetoSchema);