import { useWallet } from "dyor";
import { useState } from "react";

function Connection() {
  const { connect, isConnected, disconnect, isConnecting, extensions } =
    useWallet();
  const [extensionIdx, setExtensionIdx] = useState(0);

  return (
    <>
      <h3>Connection</h3>
      <div>
        <select onChange={(e) => setExtensionIdx(Number(e.target.value))}>
          {extensions.map((extension, index) => (
            <option key={extension.name} value={index}>
              {extension.name}
            </option>
          ))}
        </select>
      </div>
      {!isConnected && (
        <button onClick={() => connect(extensions[extensionIdx])}>
          Connect
        </button>
      )}
      {isConnected && <button onClick={disconnect}>Disconnect</button>}
      {isConnecting && <p>Connecting...</p>}
    </>
  );
}

export default Connection;
