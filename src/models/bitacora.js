import { path } from "express/lib/application";
import { type } from "express/lib/response";
import { Schema, model } from "mongoose";



const Bitacora = new Schema({
    id: String,
    path: String,
    name: String,
    create_at: {
        type: Date,
        default: Date.now()
    }
});

export default model('bitacora',Bitacora)