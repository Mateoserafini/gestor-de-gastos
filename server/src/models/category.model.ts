import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const categorySchema = new mongoose.Schema<ICategory>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        timestamps: true
    }
);

export const Category = mongoose.model<ICategory>('Category', categorySchema);
