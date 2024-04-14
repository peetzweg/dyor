import type { StateCreator } from "zustand";
import type { PolkadotDappState, PolkadotDappProps } from "./index.js";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

type InjectedAccountWithMeta = Awaited<ReturnType<typeof web3Accounts>>[0];
export interface WalletSlice {
  accounts: InjectedAccountWithMeta[];
  connect: () => Promise<InjectedAccountWithMeta[]>;
  selectAccount: (address: string) => void;
  isConnecting: boolean;
  isConnected: boolean;
  selectedAccount?: InjectedAccountWithMeta;
}

export const createWalletSlice: (
  props: PolkadotDappProps
) => StateCreator<PolkadotDappState, [], [], WalletSlice> =
  (props) => (set, get) => {
    const connect: WalletSlice["connect"] = async () => {
      set({ isConnecting: true });
      const extensions = await web3Enable("Polkadot Dapp Template");
      if (extensions.length !== 0) {
        const accounts = await web3Accounts();
        set({ accounts, isConnected: true });
        return accounts;
      }
      set({ isConnecting: false });
      return [];
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
      selectAccount,
    };
  };
