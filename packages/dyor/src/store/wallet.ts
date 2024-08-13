import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import type { StateCreator } from "zustand";
import type { Config, DyorState } from "./index.js";

type InjectedAccountWithMeta = Awaited<ReturnType<typeof web3Accounts>>[0];
export interface WalletSlice {
  accounts: InjectedAccountWithMeta[];
  isConnecting: boolean;
  isConnected: boolean;
  selectedAccount?: InjectedAccountWithMeta;
  connect: () => Promise<InjectedAccountWithMeta[]>;
  disconnect: () => void;
  selectAccount: (address: string) => void;
}

export const createWalletSlice: (
  props: Config
) => StateCreator<DyorState, [], [], WalletSlice> = (props) => (set, get) => {
  const connect: WalletSlice["connect"] = async () => {
    set({ isConnecting: true });
    const extensions = await web3Enable("Polkadot Dapp Template");
    if (extensions.length === 0) {
      set({ isConnecting: false });
      return [];
    }

    const accounts = await web3Accounts();
    set({ accounts, isConnected: true, isConnecting: false });
    return accounts;
  };

  const disconnect: WalletSlice["disconnect"] = () => {
    set({
      accounts: [],
      selectAccount: undefined,
      isConnected: false,
      isConnecting: false,
    });
  };

  const selectAccount: WalletSlice["selectAccount"] = (address) => {
    set({
      selectedAccount: get().accounts.find((a) => a.address === address),
    });
  };

  if (props.eagerConnect) {
    void connect().then((accounts) => {
      if (accounts[0]) {
        selectAccount(accounts[0].address);
      }
    });
  }

  return {
    accounts: [],
    isConnected: false,
    isConnecting: false,
    selectedAccount: undefined,
    connect,
    disconnect,
    selectAccount,
  };
};
