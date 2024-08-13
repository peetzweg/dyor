import { WsProvider } from "@polkadot/api";
import { DyorProvider, RequireReady } from "dyor";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const config = {
  chains: {
    AssetHub: {
      provider: new WsProvider(`wss://polkadot-asset-hub-rpc.polkadot.io`),
    },
    Polkadot: {
      provider: new WsProvider(`wss://rpc.polkadot.io`),
    },
    People: {
      provider: new WsProvider(
        `wss://pop-testnet.parity-lab.parity.io:443/9910`
      ),
    },
  },
  eagerConnect: true,
} as const;

export type Config = typeof config;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DyorProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RequireReady chains={["People"]}>
          <App />
        </RequireReady>
      </QueryClientProvider>
    </DyorProvider>
  </React.StrictMode>
);
