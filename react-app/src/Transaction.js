
function Transaction({ transaction}) {
const income = transaction?.amount > 0 ? true : false;
  return (
    <div className={income ? "income" : "expense"}>
      <h3>Transaction amount ({transaction?.amount > 0 ? "income" : "expense"}) account {transaction?.account_from}</h3>
      <p>
        Transfered {transaction?.amount}${" "}
        {income ? "to" : "from"} account{" "}
        {transaction?.account_to}
      </p>
    </div>
  );
}

export default Transaction;
