import { useWallet } from "dyor";

function Accounts() {
  const { accounts, selectedAccount, selectAccount } = useWallet();

  return (
    <>
      <h3>Accounts</h3>

      {selectedAccount && <p>Selected Account: {selectedAccount.address}</p>}

      <ol>
        {accounts.map((account) => (
          <li
            onClick={() => selectAccount(account.address)}
            key={account.address}
          >
            {account.address}
          </li>
        ))}
      </ol>
    </>
  );
}

export default Accounts;
