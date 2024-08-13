import { WsProvider } from "@polkadot/api";
import { DyorProvider } from "dyor";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const config = {
  chains: {
    AssetHub: {
      provider: new WsProvider(`wss://polkadot-asset-hub-rpc.polkadot.io`),
    },
  },
  eagerConnect: true,
} as const;

export type Config = typeof config;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DyorProvider config={config}>
      <App />
    </DyorProvider>
  </React.StrictMode>
);
