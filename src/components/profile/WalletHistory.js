// WalletHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Spinner from "../Spinner";

const WalletHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/wallet/transactions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Wallet History</h2>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Amount</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id} className="border-b text-gray-700">
                  <td className="p-3">{new Date(txn.date).toLocaleDateString()}</td>
                  <td
                    className={`p-3 text-center font-medium ${
                      txn.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {txn.type === "credit" ? `+ $${txn.amount.toFixed(2)}` : `- $${Math.abs(txn.amount).toFixed(2)}`}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        txn.type === "credit"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {txn.type === "credit" ? (
                        <>
                          <FaArrowDown className="mr-1 text-green-500" /> Credit
                        </>
                      ) : (
                        <>
                          <FaArrowUp className="mr-1 text-red-500" /> Debit
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        txn.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : txn.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">{txn.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WalletHistory;