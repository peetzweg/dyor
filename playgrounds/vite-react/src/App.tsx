import { useApi, useChainDetails, useWallet } from "dyor";
import type { Config } from "./main";

function App() {
  const { token, decimals } = useChainDetails<Config>("AssetHub");
  const {
    connect,
    accounts,
    isConnected,
    disconnect,
    isConnecting,
    selectedAccount,
  } = useWallet();
  const api = useApi<Config>("AssetHub");
  console.log({ api, token, decimals });

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
