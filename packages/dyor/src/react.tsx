import { ApiPromise } from "@polkadot/api";
import type { ReactNode } from "react";
import React, { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import type {
  APISlice,
  DyorConfig,
  DyorState,
  PolkadotDappStore,
  WalletSlice,
} from "./store/index.js";
import { createPolkadotDappStore } from "./store/index.js";
export { useChainDetails } from "./hooks/useChainDetails.js";

export const PolkadotDappContext = createContext<PolkadotDappStore | null>(
  null
);

export const DyorProvider: React.FC<{
  children: ReactNode;
  config: DyorConfig;
}> = ({ children, config }) => {
  const storeRef = useRef<PolkadotDappStore>();

  if (!storeRef.current) {
    storeRef.current = createPolkadotDappStore(config);
  }

  return (
    <PolkadotDappContext.Provider value={storeRef.current}>
      {children}
    </PolkadotDappContext.Provider>
  );
};

export function useDyor<T>(selector: (state: DyorState) => T): T {
  const store = useContext(PolkadotDappContext);
  // if (!store)
  //   throw new Error("Missing PolkadotDappContext.Provider in the tree");
  return useStore(store!, selector);
}

export function useApi(chain: keyof APISlice["api"]): ApiPromise {
  const api = useDyor((state) => state.api[chain]);
  if (!api)
    throw Error(
      `Api for '${chain}' not available, make sure it's setup correctly in DyorProvider`
    );
  return api;
}

export function useWallet(): WalletSlice {
  return useDyor((state) => ({
    accounts: state.accounts,
    connect: state.connect,
    disconnect: state.disconnect,
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    selectAccount: state.selectAccount,
    selectedAccount: state.selectedAccount,
  }));
}
