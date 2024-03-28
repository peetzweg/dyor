import type { ApiOptions } from "@polkadot/api/types";
import { createStore } from "zustand";
import type { APISlice } from "./chains.js";
import { createAPISlice } from "./chains.js";
import type { WalletSlice } from "./wallet.js";
import { createWalletSlice } from "./wallet.js";

export type PolkadotDappState = APISlice & WalletSlice;
export type { APISlice, WalletSlice };

export interface PolkadotDappProps {
  eagerConnect: boolean;
  chains: Record<string, ApiOptions>;
}
export type PolkadotDappStore = ReturnType<typeof createPolkadotDappStore>;

export const createPolkadotDappStore = (
  initProps?: Partial<PolkadotDappProps>
) => {
  const props: PolkadotDappProps = {
    eagerConnect: false,
    chains: {},
    ...initProps,
  };

  return createStore<PolkadotDappState>()((...a) => ({
    ...createAPISlice(props)(...a),
    ...createWalletSlice(props)(...a),
  }));
};
