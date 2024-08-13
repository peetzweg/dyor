import {
  Injected,
  InjectedAccount,
  InjectedExtension,
  InjectedWindow,
} from "@polkadot/extension-inject/types";
import { createStore } from "zustand";
import { DyorConfig } from "./index.js";

type Extension = {
  name: string;
  version: string;
  connect?: (origin: string) => Promise<InjectedExtension>;
  enable?: (origin: string) => Promise<Injected>;
};

export interface WalletState {
  accounts: InjectedAccount[];
  isConnecting: boolean;
  isConnected: boolean;
  isReady: boolean;
  extensions: Extension[];
  provider: InjectedExtension | Injected | undefined;
  selectedAccount?: InjectedAccount;
  init: () => Promise<void>;
  connect: (extension: Extension) => Promise<void>;
  disconnect: () => void;
  selectAccount: (address: string) => void;
}

const DEFAULT_STATE = {
  accounts: [],
  isReady: false,
  isConnecting: false,
  isConnected: false,
  extensions: [],
  provider: undefined,
  selectedAccount: undefined,
};

const win = window as Window & InjectedWindow;
export function createWalletStore<C extends DyorConfig>(config: C) {
  // TODO use config
  return createStore<WalletState>((set, get) => ({
    ...DEFAULT_STATE,
    init: async () => {
      const extensions: Extension[] = Object.entries(win.injectedWeb3).map(
        ([nameOrHash, { connect, enable, version }]) => {
          return {
            name: nameOrHash,
            version: version || "unknown",
            connect,
            enable,
          };
        }
      );

      if (extensions.length === 0) {
        console.warn("No extensions found");
      }
      set({ extensions, isReady: true });
    },
    connect: async (extension: Extension) => {
      set({ isConnecting: true });

      if (!extension.enable) {
        console.warn('Extension does not support "enable"');
        return;
      }
      const provider = await extension.enable("dyor");
      const accounts = await provider.accounts.get();

      if (accounts.length === 0) {
        console.warn("No accounts found");
        return;
      }

      set({
        accounts,
        provider,
        isConnected: true,
        isConnecting: false,
      });
    },
    disconnect: () => {
      set({
        accounts: [],
        isConnected: false,
        selectedAccount: undefined,
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
