import "./App.css";
import BalanceItem from "./BalanceItem";

function Balance({ accountsData }) {
  console.log(accountsData);
  return (
    <div className="balance">
      <h2>Accounts Balance</h2>
      {accountsData &&
        accountsData?.map((account) => (
          <BalanceItem key={account.account_id} account={account} />
        ))}
    </div>
  );
}

export default Balance;
