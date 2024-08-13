import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { createStore } from "zustand";
import { DyorConfig } from "./index.js";

type InjectedAccountWithMeta = Awaited<ReturnType<typeof web3Accounts>>[0];
export interface WalletState {
  accounts: InjectedAccountWithMeta[];
  isConnecting: boolean;
  isConnected: boolean;
  selectedAccount?: InjectedAccountWithMeta;
  connect: () => Promise<InjectedAccountWithMeta[]>;
  disconnect: () => void;
  selectAccount: (address: string) => void;
}

export function createWalletStore<C extends DyorConfig>(config: C) {
  // TODO use config
  return createStore<WalletState>((set, get) => ({
    accounts: [],
    isConnecting: false,
    isConnected: false,
    selectedAccount: undefined,
    connect: async () => {
      set({ isConnecting: true });
      const extensions = await web3Enable("Polkadot Dapp Template");
      if (extensions.length === 0) {
        set({ isConnecting: false });
        return [];
      }

      const accounts = await web3Accounts();
      set({ accounts, isConnected: true, isConnecting: false });
      return accounts;
    },
    disconnect: () => {
      set({
        accounts: [],
        selectedAccount: undefined,
        isConnected: false,
        isConnecting: false,
      });
    },
    selectAccount: (address) => {
      set({
        selectedAccount: get().accounts.find((a) => a.address === address),
      });
    },
  }));
}
export type WalletStore = ReturnType<typeof createWalletStore>;
