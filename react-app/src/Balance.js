import "./App.css";
import { useState, useEffect } from "react";
// import { fetchBalance } from "./backend/backend";

function Balance({accounts}) {
    const [balance, setBalance] = useState("");

    // useEffect(() => {
    //     const getBalance = async () => {
    //       const data = await fetchBalance(transaction.account_id);
    //       setBalance(data);
    //     };
    //     getBalance();
    // }, [accounts]);
  return (
    <div>
      <h3>
        Balance: {balance}
      </h3>

    </div>
  );
}

export default Balance;
