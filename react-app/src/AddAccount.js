import "./App.css";
import { createAccount } from "./backend/backend";
import { useState } from "react";

function AddAccount({ setErr, updateAccounts }) {
  const [balance, setBalance] = useState("");

  const handleBalance = (evt) => {
    setBalance(evt.target.value);
  };

  const addAccount = async (evt) => {
    evt.preventDefault();
    try {
      setErr("");
      const account = await createAccount({
        balance: Number(balance),
      });
      setBalance(0);
      updateAccounts(account);
    } catch (error) {
      console.log(error);
      setErr(`Error ${error.response.data.message}`);
    }
  };

  return (
    <div className="add_acc">
      <h2>Create new account</h2>
      <form onSubmit={addAccount}>
        {/* <label>Balance: </label> */}
        <input
          type="text"
          value={balance}
          onChange={handleBalance}
          placeholder="Balance (leave blank if balance is 0)"
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default AddAccount;
