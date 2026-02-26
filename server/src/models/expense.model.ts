import mongoose from "mongoose";

export interface IExpense extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    description: string;
    category: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const expenseSchema = new mongoose.Schema<IExpense>({
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
        required: true,
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

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);