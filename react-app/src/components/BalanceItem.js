import "./App.css";

function BalanceItem({account}) {
  return (
    <div className="balance_item">
      <p>{account.account_id}: <span>{account.balance}$</span></p>
    </div>
  );
}
export default BalanceItem;
