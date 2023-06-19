import "./App.css";
import { useState, useEffect } from "react";
import { fetchBalance} from "./backend/backend";

function Transaction({ transaction}) {
  const [balance, setBalance] = useState("");

  useEffect(() => {
      const getBalance = async () => {
        const data = await fetchBalance(transaction.account_id);
        setBalance(data);
      };
      getBalance();
  }, [transaction]);
  return (
    <div>
      <h3>Transaction amount ({transaction?.amount > 0 ? "deposit" : "withdrawl"})</h3>
      <p>
        Transfered {transaction?.amount}${" "}
        {transaction?.amount > 0 ? "to" : "from"} account{" "}
        {transaction?.account_id}
      </p>
      {balance || balance === 0 ? <p>Current balance {balance}$</p>: ""}
    </div>
  );
}

export default Transaction;
