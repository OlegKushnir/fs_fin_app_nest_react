
function Transaction({ transaction}) {

  return (
    <div>
      <h3>Transaction amount ({transaction?.amount > 0 ? "deposit" : "withdrawl"})</h3>
      <p>
        Transfered {transaction?.amount}${" "}
        {transaction?.amount > 0 ? "to" : "from"} account{" "}
        {transaction?.account_id}
      </p>
    </div>
  );
}

export default Transaction;
