import "./App.css";
import { createTransaction } from "./backend/backend";
import { useState } from "react";

function AddTransactionForm({ updateInfo, accounts, setErr }) {
  const [accountFrom, setAccountFrom] = useState("");
  const [accountTo, setAccountTo] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescr] = useState("");

  const handleAccountFrom = (evt) => {
    setAccountFrom(evt.target.value);
    if (!evt.target.value) setAccountTo("");
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
      <form onSubmit={addTransaction}>
        <label>Account From: </label>
        <select
          name="accountFrom"
          value={accountFrom}
          onChange={handleAccountFrom}
          required
        >
          <option value="">choose account</option>
          {accounts?.map((ac) => (
            <option key={ac} value={ac}>
              {ac}
            </option>
          ))}
        </select>
        <label>Account To: </label>
        <select
          name="accountTo"
          value={accountTo}
          onChange={handleAccountTo}
          disabled={!accountFrom}
          required
        >
          <option value="">choose account</option>
          {accounts?.reduce((filtered, ac) => {
            if (ac !== accountFrom) {
              return [
                ...filtered,
                <option key={ac} value={ac}>{ac}</option>
              ];
            }
            return filtered;
          }, [])}
        </select>
        <label>Amount: </label>
        <input
          value={amount}
          onChange={handleAmount}
          pattern="[0-9]+"
          title="Enter only numbers"
          required
        />
        <label>Description: </label>
        <input value={description} onChange={handleDescr} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddTransactionForm;
