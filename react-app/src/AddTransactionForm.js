import "./App.css";
import { createTransaction } from "./backend/backend";
import { useState } from "react";

function AddTransactionForm({ updateInfo, accounts, setErr }) {
  const [accountFrom, setAccountFrom] = useState("");
  const [accountTo, setAccountTo] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescr] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true)
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
    setLoading(false);
    setErr("");
  };

  return (
    <div className="add_transaction">
      <h2>Create new transaction</h2>
      <form onSubmit={addTransaction}>
        <select
          name="accountFrom"
          value={accountFrom}
          onChange={handleAccountFrom}
          required
        >
          <option value="">account from</option>
          {accounts?.map((ac) => (
            <option key={ac} value={ac}>
              {ac}
            </option>
          ))}
        </select>
        <select
          name="accountTo"
          value={accountTo}
          onChange={handleAccountTo}
          disabled={!accountFrom}
          required
        >
          <option value="">account to</option>
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
        <input
          placeholder="amount"
          value={amount}
          onChange={handleAmount}
          pattern="[0-9]+"
          title="Enter only numbers"
          required
        />
        <input placeholder="description" value={description} onChange={handleDescr} />
        <input type="submit" value="Submit" disabled={loading} />
      </form>
    </div>
  );
}

export default AddTransactionForm;
