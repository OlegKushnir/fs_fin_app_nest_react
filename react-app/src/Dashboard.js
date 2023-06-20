import "./App.css";
import { useState, useEffect } from "react";
import { fetchTransactions, fetchAccounts } from "./backend/backend";
import Transaction from "./Transaction";
import AddTransactionForm from "./AddTransactionForm";
import Balance from "./Balance";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [err, setErr] = useState("");

  const updateInfo = async (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    const accounts = await fetchAccounts();
    setAccountsData(accounts);
  };

  const renderTransactions = () => {
    const revercedTransactions = [...transactions].reverse();
    return revercedTransactions?.map((transaction, index) => (
      <Transaction transaction={transaction} key={index} />
    ));
  };

  useEffect(() => {
    try {
      if (!transactions.length) {
        const getData = async () => {
          const data = await fetchTransactions();
          setTransactions(data);
          const accounts = await fetchAccounts();
          setAccountsData(accounts);
        };
        getData();
      }
    } catch (error) {
      setErr(error);
    }
  }, [transactions]);
  return (
    <div className="App">
      <div className="left_panel">
        <Balance accountsData={accountsData} />
        <AddTransactionForm
          updateInfo={updateInfo}
          setErr={setErr}
        />
      </div>
      <div className="transactions">
        <h2>Transactions history </h2>
        {err && (
          <div>
            <h3>{err}</h3>
          </div>
        )}
        {transactions && renderTransactions()}
      </div>
    </div>
  );
}

export default Dashboard;
