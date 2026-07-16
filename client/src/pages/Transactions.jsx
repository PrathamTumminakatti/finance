
import { useEffect, useState, useCallback } from "react";

import MainLayout from "../components/layout/MainLayout";

import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";

import { getTransactions } from "../services/transactionService";
import { useAuth } from "../context/AuthContext";

import "../components/transactions/styles/Transactions.css";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDate, setSelectedDate] = useState("");
    const [sortBy, setSortBy] = useState("date-desc");
    const [currentPage, setCurrentPage] = useState(1);

    const transactionsPerPage = 10;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { user } = useAuth();

    const fetchTransactions = useCallback(async () => {

        if (!user) return;

        try {

            setLoading(true);
            setError("");

            const data = await getTransactions(user.id);

            setTransactions(data);

        }

        catch (err) {

            console.error(err);

            setError("Failed to load transactions.");

        }

        finally {

            setLoading(false);

        }

    }, [user]);

    useEffect(() => {

        fetchTransactions();

    }, [fetchTransactions]);

    useEffect(() => {

        setCurrentPage(1);

    }, [

        searchTerm,

        selectedCategory,

        selectedDate,

        sortBy

    ]);

    const filteredTransactions = transactions.filter((transaction) => {

        const matchesSearch =

            !searchTerm ||

            transaction.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())

            ||

            transaction.category
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =

            selectedCategory === "All"

            ||

            transaction.category === selectedCategory;

        const transactionDate = new Date(transaction.transaction_date);

        const localDate =

            `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, "0")}-${String(transactionDate.getDate()).padStart(2, "0")}`;

        const matchesDate =

            !selectedDate ||

            localDate === selectedDate;

        return (

            matchesSearch &&

            matchesCategory &&

            matchesDate

        );

    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {

        switch (sortBy) {

            case "date-asc":
                return new Date(a.transaction_date) - new Date(b.transaction_date);

            case "amount-desc":
                return Number(b.amount) - Number(a.amount);

            case "amount-asc":
                return Number(a.amount) - Number(b.amount);

            case "category":
                return a.category.localeCompare(b.category);

            default:
                return new Date(b.transaction_date) - new Date(a.transaction_date);

        }

    });

    const indexOfLastTransaction =
        currentPage * transactionsPerPage;

    const indexOfFirstTransaction =
        indexOfLastTransaction - transactionsPerPage;

    const currentTransactions =
        sortedTransactions.slice(
            indexOfFirstTransaction,
            indexOfLastTransaction
        );

    const totalPages = Math.ceil(
        sortedTransactions.length / transactionsPerPage
    );

    return (

        <MainLayout>

            <div className="transactions-container">

                <div className="transactions-header">

                    <h1>Transactions</h1>

                    <p>

                        Manage your financial transactions,
                        track expenses and maintain your
                        spending history.

                    </p>

                </div>

                <TransactionFilters

                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}

                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}

                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}

                    sortBy={sortBy}
                    setSortBy={setSortBy}

                />

                {user && (

                    <TransactionForm

                        userId={user.id}

                        onTransactionAdded={fetchTransactions}

                    />

                )}

                {

                    loading ? (

                        <p>Loading transactions...</p>

                    ) : error ? (

                        <p>{error}</p>

                    ) : (

                        <TransactionTable

                            transactions={currentTransactions}

                        />

                    )

                }

                {

                    totalPages > 1 && (

                        <div className="pagination">

                            <button

                                onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                }

                                disabled={currentPage === 1}

                            >

                                Previous

                            </button>

                            {

                                Array.from(
                                    { length: totalPages },
                                    (_, index) => (

                                        <button

                                            key={index + 1}

                                            className={
                                                currentPage === index + 1
                                                    ? "active-page"
                                                    : ""
                                            }

                                            onClick={() =>
                                                setCurrentPage(index + 1)
                                            }

                                        >

                                            {index + 1}

                                        </button>

                                    )

                                )

                            }

                            <button

                                onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                }

                                disabled={currentPage === totalPages}

                            >

                                Next

                            </button>

                        </div>

                    )

                }

            </div>

        </MainLayout>

    );

}

export default Transactions;
