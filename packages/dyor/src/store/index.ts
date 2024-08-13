export { createApiStore } from "./api.js";
export type { ApiStore } from "./api.js";
export { createWalletStore } from "./wallet.js";
export type { WalletStore } from "./wallet.js";

import type { ApiOptions as PJSApiOptions } from "@polkadot/api/types";

export interface DyorConfig {
  eagerConnect?: boolean;
  chains: Record<string, PJSApiOptions>;
}
