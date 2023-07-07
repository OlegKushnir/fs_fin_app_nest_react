function Transaction({ transaction }) {
  return (
    <div className="transaction">
      <h3>account {transaction?.account_from}</h3>
      <div className="thumb">
      <p>Description: {transaction?.description}</p>
        <p>
          Transfered to account {transaction?.account_to}{" "}
          <span>{transaction?.amount}$</span>
        </p>
        
      </div>
    </div>
  );
}

export default Transaction;
