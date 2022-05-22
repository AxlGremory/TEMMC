import { Schema, model } from "mongoose";


const EquipoSchema = new Schema({
PARTIDA: Number,
ZONA: String,
JCU: Number,
CLASIFICACION: String,
EQUIPO: String,
MARCA: String,
MODELO: String,
SERIE: String,
UNIDAD: String,
MES: String,
STATUS: {
    type: Boolean,
    default: false
}
})

export default model('Equipo', EquipoSchema);