import api from "./api";

export const addTransaction = async (transaction) => {

    const response = await api.post(
        "/transactions/add",
        transaction
    );

    return response.data;

};

export const getTransactions = async (userId) => {

    const response = await api.get(
        `/transactions/${userId}`
    );

    return response.data;

};