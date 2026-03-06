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

    const handleDeleteIncome = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this income?')) {
            try {
                await api.delete(`/incomes/${id}`);
                setIncomes(incomes.filter(income => income._id !== id));
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error deleting income');
            }
        }
    };

    const handleDeleteExpense = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await api.delete(`/expenses/${id}`);
                setExpenses(expenses.filter(expense => expense._id !== id));
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error deleting expense');
            }
        }
    };

    const totalIncomes = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncomes - totalExpenses;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-brand-accent/20">
                <div>
                    <h1 className="text-3xl font-extrabold text-brand-text tracking-tight">Dashboard</h1>
                    <p className="text-brand-text/70 mt-1">Welcome back, {user?.username}!</p>
                </div>
                <button
                    onClick={logout}
                    className="mt-4 sm:mt-0 px-4 py-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg font-semibold transition-all duration-200"
                >
                    Logout
                </button>
            </header>

            <main className="space-y-8">
                {/* Balance Summary Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl"></div>

                    <h2 className="text-xl font-bold text-brand-text mb-6 relative z-10">Balance Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                            <p className="text-sm font-semibold text-green-700 mb-1">Total Incomes</p>
                            <p className="text-2xl font-bold text-green-600">${totalIncomes.toFixed(2)}</p>
                        </div>
                        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                            <p className="text-sm font-semibold text-red-700 mb-1">Total Expenses</p>
                            <p className="text-2xl font-bold text-brand-primary">${totalExpenses.toFixed(2)}</p>
                        </div>
                        <div className="bg-brand-text/5 p-4 rounded-xl border border-brand-accent/20 md:col-start-3">
                            <p className="text-sm font-semibold text-brand-text/80 mb-1">Net Balance</p>
                            <h3 className={`text-3xl font-extrabold ${balance >= 0 ? 'text-green-600' : 'text-brand-primary'}`}>
                                ${balance.toFixed(2)}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Incomes & Expenses Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Incomes Section */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-brand-text">Recent Incomes</h2>
                            <button
                                onClick={() => navigate('/add-income')}
                                className="px-3 py-1.5 bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-text text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-4 py-1">
                                        <div className="h-4 bg-brand-accent/20 rounded w-3/4"></div>
                                        <div className="h-4 bg-brand-accent/20 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ) : error ? (
                                <p className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</p>
                            ) : incomes.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center text-brand-text/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>No incomes recorded yet.</p>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {incomes.map((income) => (
                                        <li key={income._id} className="group flex justify-between items-center p-4 bg-white rounded-xl border border-brand-accent/10 shadow-sm hover:shadow-md transition-all">
                                            <div className="flex items-start flex-col">
                                                <strong className="text-brand-text font-semibold">{income.description}</strong>
                                                <span className="text-xs text-brand-text/50 mt-1">{new Date(income.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-green-600">+${income.amount.toFixed(2)}</span>
                                                <button
                                                    onClick={() => handleDeleteIncome(income._id)}
                                                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg"
                                                    title="Delete income"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Expenses Section */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-brand-text">Recent Expenses</h2>
                            <button
                                onClick={() => navigate('/add-expense')}
                                className="px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-4 py-1">
                                        <div className="h-4 bg-brand-accent/20 rounded w-3/4"></div>
                                        <div className="h-4 bg-brand-accent/20 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ) : error ? (
                                <p className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</p>
                            ) : expenses.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center text-brand-text/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p>No expenses recorded yet.</p>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {expenses.map((expense) => (
                                        <li key={expense._id} className="group flex justify-between items-center p-4 bg-white rounded-xl border border-brand-accent/10 shadow-sm hover:shadow-md transition-all">
                                            <div className="flex items-start flex-col">
                                                <strong className="text-brand-text font-semibold">{expense.description}</strong>
                                                <span className="text-xs text-brand-text/50 mt-1">{new Date(expense.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-brand-primary">-${expense.amount.toFixed(2)}</span>
                                                <button
                                                    onClick={() => handleDeleteExpense(expense._id)}
                                                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg"
                                                    title="Delete expense"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
