import "./App.css";
// import Switch from "./Switch";
import { createTransaction } from "./backend/backend";
import { useState } from "react";

function AddTransactionForm({ updateInfo, setErr }) {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");

  const handleAccountId = (evt) => {
    setAccountId(evt.target.value);
  };

  const handleAmount = (evt) => {
    setAmount(evt.target.value);
  };

  const addTransaction = async (evt) => {
    evt.preventDefault();
    
    try {
      setErr('')
      const res = await createTransaction({
        account_id: accountId,
        amount: Number(amount),
      });
      updateInfo(res);
      setAccountId("");
      setAmount("");
    } catch (error) {
      console.log(error);
      setErr(`Error ${error.response.data.message}`)
    }
  };

  return (
    <div className="formWrapper">
      <h2>Submit new transaction</h2>
      {/* <Switch/> */}
      <form onSubmit={addTransaction}>
        <label>Account ID: </label>
        <input
          value={accountId}
          onChange={handleAccountId}
        />
        <label>Amount: </label>
        <input value={amount} onChange={handleAmount} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddTransactionForm;
