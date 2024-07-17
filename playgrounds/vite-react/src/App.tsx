import { useApi, useWallet } from "dyor";

function App() {
  const api = useApi("AssetHub");
  const { connect, accounts, isConnected, disconnect, isConnecting, selectedAccount } =
    useWallet();

  return (
    <>
      <h1>dyor vite-react playground</h1>
      {!isConnected && <button onClick={connect}>Connect</button>}
      {isConnected && <button onClick={disconnect}>Disconnect</button>}
      {isConnecting && <p>Connecting...</p>}
      {selectedAccount && <p>Selected Account: {selectedAccount.address}</p>}
      <ol style={{ font: 'monospace' }}>
        {accounts.map((account) => (
          <li key={account.address}>{account.address}</li>
        ))}
      </ol>
    </>
  );
}

export default App;
