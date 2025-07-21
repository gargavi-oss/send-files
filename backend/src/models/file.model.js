import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const fileSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    code: {
        type:String,
        unique: true
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }


},{
    timestamps: true
})

fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

export const File = mongoose.model("File",fileSchema)