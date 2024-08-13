import { ApiPromise } from "@polkadot/api";
import type { ReactNode } from "react";
import React, { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { type ApiState, type ApiStore, createApiStore } from "./store/api.js";
import { type DyorConfig } from "./store/index.js";
import {
  type WalletState,
  type WalletStore,
  createWalletStore,
} from "./store/wallet.js";
export { useChainDetails } from "./hooks/useChainDetails.js";

// TODO here we are losing the generic type of the config
export const DyorApiContext = createContext<ApiStore<DyorConfig> | null>(null);
export const DyorWalletContext = createContext<WalletStore | null>(null);

export function DyorProvider<C extends DyorConfig>({
  children,
  config,
}: {
  children: ReactNode;
  config: C;
}) {
  const apiStoreRef = useRef<ApiStore<C>>();
  const walletStoreRef = useRef<WalletStore>();

  if (!apiStoreRef.current) {
    apiStoreRef.current = createApiStore<C>(config);
  }

  if (!walletStoreRef.current) {
    walletStoreRef.current = createWalletStore(config);
  }

  return (
    <DyorApiContext.Provider value={apiStoreRef.current}>
      <DyorWalletContext.Provider value={walletStoreRef.current}>
        {children}
      </DyorWalletContext.Provider>
    </DyorApiContext.Provider>
  );
}

export function useDyorApi<T>(selector: (state: ApiState<DyorConfig>) => T): T {
  const store = useContext(DyorApiContext);
  if (!store)
    throw new Error("Missing PolkadotDappContext.Provider in the tree");
  return useStore(store, selector);
}

export function useApi<C extends DyorConfig>(
  chain: keyof C["chains"]
): ApiPromise {
  // TODO here we are losing the generic type of the config
  const api = useDyorApi((state) => state.api[chain as any]);
  if (!api)
    throw Error(
      `Api for '${chain.toString()}' not available, make sure it's setup correctly in DyorProvider`
    );
  return api;
}

export function useDyorWallet<T>(selector: (state: WalletState) => T): T {
  const store = useContext(DyorWalletContext);
  if (!store)
    throw new Error("Missing PolkadotDappContext.Provider in the tree");
  return useStore(store, selector);
}
export function useWallet(): WalletState {
  return useDyorWallet((state) => ({
    accounts: state.accounts,
    connect: state.connect,
    disconnect: state.disconnect,
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    selectAccount: state.selectAccount,
    selectedAccount: state.selectedAccount,
  }));
}
