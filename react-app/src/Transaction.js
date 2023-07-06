function Transaction({ transaction }) {
  return (
    <div className="transaction">
      <h3>Account {transaction?.account_from}</h3>
      <p>
        Transfered to account {transaction?.account_to}{" "}
        <span>{transaction?.amount}$</span>
      </p>
    </div>
  );
}

export default Transaction;
