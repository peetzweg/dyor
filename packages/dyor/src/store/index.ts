import type { ApiOptions as PJSApiOptions } from "@polkadot/api/types";
import { createStore } from "zustand";
import type { APISlice } from "./api.js";
import { createAPISlice } from "./api.js";
import type { WalletSlice } from "./wallet.js";
import { createWalletSlice } from "./wallet.js";

export type DyorState = APISlice & WalletSlice;
export type { APISlice, WalletSlice };

export interface DyorConfig {
  eagerConnect?: boolean;
  chains: Record<string, PJSApiOptions>;
}

export type PolkadotDappStore = ReturnType<typeof createPolkadotDappStore>;

const chains = {
  Polkadot: true,
  Kusama: true,
} as const;

const chainsArray = [
  ["polkadot", true],
  ["kusama", true],
] as const;

type ChainNameRecord = keyof typeof chains;
type ChainNameArray = (typeof chainsArray)[number][0];

export function createPolkadotDappStore(config: Readonly<DyorConfig>) {
  return createStore<DyorState>()((...a) => ({
    ...createAPISlice(config)(...a),
    ...createWalletSlice(config)(...a),
  }));
}
