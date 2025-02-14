import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWalletBalance } from "../../reducers/profileSlice";
import Spinner from "../Spinner";
import WalletHistory from "./WalletHistory";

function Wallet() {
  const dispatch = useDispatch();
  const { walletBalance } = useSelector((state) => state.profile);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
    const [transactions, setTransactions] = useState([]);

  const handleAddFunds = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
  
    setIsLoading(true);
    setError("");
    setSuccess("");
  
    try {
      // Add funds to the wallet
      await axios.patch(
        "http://localhost:5000/profile/wallet",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Record the transaction
      await axios.post(
        "http://localhost:5000/wallet/transactions",
        {
          amount,
          type: "credit",
          status: "completed",
          description: "Added funds to wallet",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Fetch updated wallet balance and transactions
      const [balanceResponse, transactionsResponse] = await Promise.all([
        axios.get("http://localhost:5000/profile/wallet", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        axios.get(`http://localhost:5000/wallet/transactions}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);
  
      dispatch(setWalletBalance(balanceResponse.data.balance));
      setTransactions(transactionsResponse.data.transactions);
  
      setSuccess("Funds added successfully!");
      setAmount("");
    } catch (error) {
      console.error("Error adding funds:", error);
      setError("Failed to add funds. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format wallet balance to display with commas and 2 decimal places
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(walletBalance);



  useEffect(() => {
    // Fetch wallet balance when the component mounts
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile/wallet",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(setWalletBalance(response.data.balance));
        console.log("Wallet balance fetched:", response.data.balance);
      }
      catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };
    fetchWalletBalance();
    // Unsubscribe from effect when component unmounts
    return () => {
      
    };
  }, []);


  return (
    <>
    <div>
      <p className="text-lg mb-4">Current Balance: {formattedBalance}</p>
      <div className="flex items-center">
        <input
          type="number"
          className="p-2 border rounded-lg mr-2"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError(""); // Clear error when user starts typing
          }}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          disabled={isLoading}
        />
        <button
          onClick={handleAddFunds}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          disabled={isLoading || !amount || amount <= 0}
        >
          {isLoading ? <Spinner /> : "Add Funds"}
        </button>
      </div>

      {/* Display success or error messages */}
      {success && (
        <p className="mt-4 text-green-600 text-sm">{success}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}
    </div>
    <WalletHistory />
    </>
  );
}

export default Wallet;