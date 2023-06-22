function Transaction({ transaction }) {
  return (
    <div className="income">
      <h3>Account {transaction?.account_from}</h3>
      <p>
        Transfered <b>{transaction?.amount}$</b> to account{" "}
        {transaction?.account_to}
      </p>
    </div>
  );
}

export default Transaction;
