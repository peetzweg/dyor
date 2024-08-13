import { useChainDetails, useWallet } from "dyor";

function App() {
  const { token, decimals } = useChainDetails("AssetHub");
  const {
    connect,
    accounts,
    isConnected,
    disconnect,
    isConnecting,
    selectedAccount,
  } = useWallet();

  return (
    <>
      <h1>dyor vite-react playground</h1>
      {!isConnected && <button onClick={connect}>Connect</button>}
      {isConnected && <button onClick={disconnect}>Disconnect</button>}
      {isConnecting && <p>Connecting...</p>}
      {selectedAccount && <p>Selected Account: {selectedAccount.address}</p>}
      <ol style={{ font: "monospace" }}>
        {accounts.map((account) => (
          <li key={account.address}>{account.address}</li>
        ))}
      </ol>

      {token && <p>Symbol: {token}</p>}
      {decimals && <p>Decimals: {decimals}</p>}
    </>
  );
}

export default App;
