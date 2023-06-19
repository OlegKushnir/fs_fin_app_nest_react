import "./App.css";
// import { useState, useEffect } from "react";
// import { fetchAccounts } from "./backend/backend";
import BalanceItem from "./BalanceItem";
// import { fetchBalance } from "./backend/backend";

function Balance({accountsData}) {
  // const [accountsData, setAccountsData] = useState("");

  // useEffect(() => {
  //   const getBalance = async () => {
  //     const accounts = await fetchAccounts();
  //     setAccountsData(accounts);
  //   };
  //   if (!accountsData.length) {
  //     getBalance();
  //   }
  // }, [accountsData]);
  return (
    <div>
      <h3>Balance</h3>
      {accountsData &&
        accountsData?.map((account) => (
          <BalanceItem key={account.account_id} account={account} />
        ))}
    </div>
  );
}

export default Balance;
