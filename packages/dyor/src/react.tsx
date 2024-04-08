import type { ReactNode } from "react";
import React from "react";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import type {
  APISlice,
  PolkadotDappProps,
  PolkadotDappState,
  PolkadotDappStore,
  WalletSlice,
} from "./store/index.js";
import { createPolkadotDappStore } from "./store/index.js";

export const PolkadotDappContext = createContext<PolkadotDappStore | null>(
  null
);

export const PolkadotDappProvider: React.FC<
  PolkadotDappProps & { children: ReactNode }
> = ({ children, ...props }) => {
  const storeRef = useRef<PolkadotDappStore>();
  if (!storeRef.current) {
    storeRef.current = createPolkadotDappStore(props);
  }
  return (
    <PolkadotDappContext.Provider value={storeRef.current}>
      {children}
    </PolkadotDappContext.Provider>
  );
};

export function usePolkadotDapp<T>(
  selector: (state: PolkadotDappState) => T
): T {
  const store = useContext(PolkadotDappContext);
  if (!store)
    throw new Error("Missing PolkadotDappContext.Provider in the tree");
  return useStore(store, selector);
}

export const useApi = (chain: keyof APISlice["api"]) => {
  const api = usePolkadotDapp((state) => state.api[chain]);
  if (!api)
    throw Error(
      `Api for '${chain}' not available, make sure it's setup correctly in PolkadotDappProvider`
    );
  return api;
};

/**
 * DEPRECATE, use `useApi` instead`
 */
export const useChain = useApi;

export const useWallet = (): WalletSlice => {
  return usePolkadotDapp((state) => ({
    accounts: state.accounts,
    connect: state.connect,
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    selectAccount: state.selectAccount,
    selectedAccount: state.selectedAccount,
  }));
};
