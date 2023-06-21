import "./App.css";
import Switch from "./Switch";
import { createTransaction } from "./backend/backend";
import { useState } from "react";

function AddTransactionForm({ updateInfo, setErr }) {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState(true);

  const handleAccountId = (evt) => {
    setAccountId(evt.target.value);
  };

  const handleAmount = (evt) => {
    setAmount(evt.target.value);
  };

  const addTransaction = async (evt) => {
    evt.preventDefault();
    let finalAmount;
    income ? finalAmount = amount : finalAmount = -amount;
    try {
      setErr("");
      const res = await createTransaction({
        account_id: accountId,
        amount: Number(finalAmount),
      });
      updateInfo(res);
      setAccountId("");
      setAmount("");
    } catch (error) {
      console.log(error);
      setErr(`Error ${error.response.data.message}`);
    }
  };

  return (
    <div className="formWrapper">
      <h2>Submit new transaction</h2>
      <Switch setIncome={setIncome} income={income} />
      <form onSubmit={addTransaction}>
        <label>Account ID: </label>
        <input value={accountId} onChange={handleAccountId} />
        <label>Amount: </label>
        <input value={amount} onChange={handleAmount} pattern="[0-9]+" title="Enter only numbers"/>
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddTransactionForm;
