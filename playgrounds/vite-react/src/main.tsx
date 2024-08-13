import { WsProvider } from "@polkadot/api";
import type { DyorConfig } from "dyor";
import { DyorProvider } from "dyor";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const config: DyorConfig = {
  chains: {
    AssetHub: {
      provider: new WsProvider(`wss://polkadot-asset-hub-rpc.polkadot.io`),
    },
  },
  eagerConnect: true,
} as const;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DyorProvider config={config}>
      <App />
    </DyorProvider>
  </React.StrictMode>
);
