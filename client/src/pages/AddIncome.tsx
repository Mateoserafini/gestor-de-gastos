import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/api';

interface Category {
    _id: string;
    name: string;
}

export const AddIncome = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                // Format the defaults into a mock Category object for the dropdown, and combine with customs
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
            // Backend expects amount as a number, and date as an ISO string
            const formattedData = {
                ...data,
                amount: Number(data.amount),
                date: new Date(data.date).toISOString()
            };

            await api.post('/incomes', formattedData);
            navigate('/'); // Redirect back to dashboard on success
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error creating income. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Income</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        type="text"
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <span style={{ color: 'red' }}>{String(errors.description.message)}</span>}
                </div>

                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 0.01, message: 'Amount must be greater than 0' }
                        })}
                    />
                    {errors.amount && <span style={{ color: 'red' }}>{String(errors.amount.message)}</span>}
                </div>

                <div>
                    <label htmlFor="category">Category (Optional):</label>
                    <select
                        id="category"
                        {...register('category')}
                    >
                        <option value="">-- None --</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="date"
                        {...register('date', { required: 'Date is required' })}
                    />
                    {errors.date && <span style={{ color: 'red' }}>{String(errors.date.message)}</span>}
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Income'}
                </button>
                <button type="button" onClick={() => navigate('/')} disabled={isLoading}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddIncome;
