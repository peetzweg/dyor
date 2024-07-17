import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { PolkadotDappProvider } from 'dyor'
import { WsProvider } from "@polkadot/api"

const config = {
  AssetHub: {
    provider: new WsProvider(
      `wss://polkadot-asset-hub-rpc.polkadot.io`,
    ),
  },
} as const


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PolkadotDappProvider chains={config} eagerConnect>
      <App />
    </PolkadotDappProvider>
  </React.StrictMode >,
)
