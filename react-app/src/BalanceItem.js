import "./App.css";

function BalanceItem({account}) {
  return (
    <div>
      <p>{account.account_id}: {account.balance}$</p>
    </div>
  );
}
export default BalanceItem;
