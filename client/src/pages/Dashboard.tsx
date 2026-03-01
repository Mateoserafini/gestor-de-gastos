import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

interface Expense {
    _id: string;
    description: string;
    amount: number;
    date: string;
    category?: string; // Adjust based on your category implementation
}

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await api.get('/expenses');
                setExpenses(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error fetching expenses');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <header>
                <h1>Dashboard</h1>
                <p>Welcome, {user?.username}!</p>
                <button onClick={logout}>Logout</button>
            </header>

            <main>
                <h2>Your Expenses</h2>
                {isLoading ? (
                    <p>Loading expenses...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : expenses.length === 0 ? (
                    <p>No expenses found. Start adding some!</p>
                ) : (
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense._id}>
                                <strong>{expense.description}</strong>: ${expense.amount} - {new Date(expense.date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
