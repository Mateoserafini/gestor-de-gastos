import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/api';

interface Category {
    _id: string;
    name: string;
}

export const AddExpense = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                const defaultCats = response.data.defaults.map((name: string) => ({ _id: name, name }));
                const customCats = response.data.customs.map((cat: any) => ({ _id: cat._id, name: cat.name }));
                setCategories([...defaultCats, ...customCats]);
            } catch (err: any) {
                console.error('Error fetching categories:', err);
                setError('Could not load categories. Please try again later.');
            }
        };

        fetchCategories();
    }, []);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const formattedData = {
                ...data,
                amount: Number(data.amount),
                date: new Date(data.date).toISOString()
            };

            await api.post('/expenses', formattedData);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error creating expense. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 mt-10">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"></div>

                <h2 className="text-3xl font-extrabold text-brand-text mb-6 relative z-10">Add New Expense</h2>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg relative z-10">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-brand-text mb-2">Description</label>
                        <input
                            id="description"
                            type="text"
                            className="w-full px-5 py-3 rounded-xl border border-brand-accent/30 bg-white/50 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                            placeholder="e.g. Groceries"
                            {...register('description', { required: 'Description is required' })}
                        />
                        {errors.description && <p className="mt-2 text-sm text-red-600 animate-pulse">{String(errors.description.message)}</p>}
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-semibold text-brand-text mb-2">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-text/50 font-bold">$</span>
                            <input
                                id="amount"
                                type="number"
                                step="0.01"
                                className="w-full pl-8 pr-5 py-3 rounded-xl border border-brand-accent/30 bg-white/50 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                                placeholder="0.00"
                                {...register('amount', {
                                    required: 'Amount is required',
                                    min: { value: 0.01, message: 'Amount must be greater than 0' }
                                })}
                            />
                        </div>
                        {errors.amount && <p className="mt-2 text-sm text-red-600 animate-pulse">{String(errors.amount.message)}</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-brand-text mb-2">Category</label>
                        <select
                            id="category"
                            className="w-full px-5 py-3 rounded-xl border border-brand-accent/30 bg-white/50 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 appearance-none"
                            {...register('category', { required: 'Please select a category' })}
                        >
                            <option value="">-- Select a Category --</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-brand-text/50 pt-8" style={{ marginTop: 'calc(-1.5rem)' }}>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                        {errors.category && <p className="mt-2 text-sm text-red-600 animate-pulse">{String(errors.category.message)}</p>}
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-brand-text mb-2">Date</label>
                        <input
                            id="date"
                            type="date"
                            className="w-full px-5 py-3 rounded-xl border border-brand-accent/30 bg-white/50 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                            {...register('date', { required: 'Date is required' })}
                        />
                        {errors.date && <p className="mt-2 text-sm text-red-600 animate-pulse">{String(errors.date.message)}</p>}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            disabled={isLoading}
                            className="flex-1 py-3.5 px-4 rounded-xl text-brand-text font-bold text-lg border-2 border-brand-accent/30 hover:bg-brand-accent/10 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex-1 py-3.5 px-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-brand-primary/30 transform transition-all duration-200 
                                ${isLoading
                                    ? 'bg-brand-primary/70 cursor-not-allowed'
                                    : 'bg-brand-primary hover:bg-brand-primary-dark hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/40 active:translate-y-0'
                                }`}
                        >
                            {isLoading ? 'Saving...' : 'Save Expense'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
