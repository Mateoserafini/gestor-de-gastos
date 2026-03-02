import mongoose from "mongoose";

export interface IIncome extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    description: string;
    category?: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const incomeSchema = new mongoose.Schema<IIncome>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true
    }
);

export const Income = mongoose.model<IIncome>('Income', incomeSchema);
