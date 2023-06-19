import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

export async function fetchTransactions() {
  const res = await axios.get("transactions");
  return res.data;
}

export async function fetchBalance(id) {
  const res = await axios.get(`accounts/${id}`);
  return res.data.balance;
}

export async function fetchAccounts() {
  const res = await axios.get("accounts");
  return res.data;
  // return [{account_id: "0c18647a-ba8a-419f-8d72-af7ee92429c0", balance: 120}]
}

export async function createTransaction(transaction) {
  const res = await axios.post("transactions", transaction);
  return res.data;
}
