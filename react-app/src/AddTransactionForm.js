import "./App.css";
// import Switch from "./Switch";
import { createTransaction } from "./backend/backend";
import { useState } from "react";

function AddTransactionForm({ updateInfo, setErr }) {
  const [accountFrom, setAccountFrom] = useState("");
  const [accountTo, setAccountTo] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescr] = useState("");

  // const [income, setIncome] = useState(true);

  const handleAccountFrom = (evt) => {
    setAccountFrom(evt.target.value);
  };

  const handleAccountTo = (evt) => {
    setAccountTo(evt.target.value);
  };

  const handleAmount = (evt) => {
    setAmount(evt.target.value);
  };

  const handleDescr = (evt) => {
    setDescr(evt.target.value);
  };

  const addTransaction = async (evt) => {
    evt.preventDefault();
    // let finalAmount;
    // income ? (finalAmount = amount) : (finalAmount = -amount);
    try {
      setErr("");
      const res = await createTransaction({
        account_from: accountFrom,
        account_to: accountTo,
        amount: Number(amount),
        description,
      });
      updateInfo(res);
      setAccountFrom("");
      setAccountTo("");
      setAmount("");
    } catch (error) {
      console.log(error);
      setErr(`Error ${error.response.data.message}`);
    }
  };

  return (
    <div className="formWrapper">
      <h2>Submit new transaction</h2>
      {/* <Switch setIncome={setIncome} income={income} /> */}
      <form onSubmit={addTransaction}>
        <label>Account From: </label>
        <input value={accountFrom} onChange={handleAccountFrom} />
        <label>Account To: </label>
        <input value={accountTo} onChange={handleAccountTo} />
        <label>Amount: </label>
        <input
          value={amount}
          onChange={handleAmount}
          pattern="[0-9]+"
          title="Enter only numbers"
        />
        <label>Description: </label>
        <input value={description} onChange={handleDescr} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddTransactionForm;
