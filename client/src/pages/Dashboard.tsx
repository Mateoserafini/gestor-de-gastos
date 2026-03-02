import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

interface Expense {
    _id: string;
    description: string;
    amount: number;
    date: string;
    category?: string;
}

interface Income {
    _id: string;
    description: string;
    amount: number;
    date: string;
    category?: string;
}

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [expensesRes, incomesRes] = await Promise.all([
                    api.get('/expenses'),
                    api.get('/incomes')
                ]);
                setExpenses(expensesRes.data);
                setIncomes(incomesRes.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalIncomes = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncomes - totalExpenses;

    return (
        <div>
            <header>
                <h1>Dashboard</h1>
                <p>Welcome, {user?.username}!</p>
                <button onClick={logout}>Logout</button>
            </header>

            <main>
                <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '20px' }}>
                    <h2>Balance Summary</h2>
                    <p><strong>Total Incomes:</strong> ${totalIncomes.toFixed(2)}</p>
                    <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
                    <h3>Total Balance: ${balance.toFixed(2)}</h3>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <h2>Incomes</h2>
                        <button onClick={() => navigate('/add-income')}>
                            + Add New Income
                        </button>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p style={{ color: 'red' }}>{error}</p>
                        ) : incomes.length === 0 ? (
                            <p>No incomes found.</p>
                        ) : (
                            <ul>
                                {incomes.map((income) => (
                                    <li key={income._id}>
                                        <strong>{income.description}</strong>: ${income.amount} - {new Date(income.date).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div style={{ flex: 1 }}>
                        <h2>Expenses</h2>
                        <button onClick={() => navigate('/add-expense')}>
                            + Add New Expense
                        </button>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p style={{ color: 'red' }}>{error}</p>
                        ) : expenses.length === 0 ? (
                            <p>No expenses found.</p>
                        ) : (
                            <ul>
                                {expenses.map((expense) => (
                                    <li key={expense._id}>
                                        <strong>{expense.description}</strong>: ${expense.amount} - {new Date(expense.date).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
