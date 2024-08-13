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

export interface DyorConfigReadonly {
  eagerConnect?: boolean;
  chains: readonly [string, PJSApiOptions];
}

const config: DyorConfigReadonly = {
  eagerConnect: true,
  chains: ["polkadot", {}],
} as const;

export type DyorStore = ReturnType<typeof createDyorStore>;

export function createDyorStore(config: Readonly<DyorConfig>) {
  return createStore<DyorState>()((...a) => ({
    ...createAPISlice(config)(...a),
    ...createWalletSlice(config)(...a),
  }));
}
