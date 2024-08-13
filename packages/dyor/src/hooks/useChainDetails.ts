import { useApi } from "../react.js";
import { DyorConfig } from "../store/index.js";

export function useChainDetails<C extends DyorConfig>(
  chain: keyof C["chains"]
) {
  const api = useApi(chain);
  const [decimals, token] = [
    api.registry.chainDecimals[0],
    api.registry.chainTokens[0],
  ];
  return {
    decimals,
    token,
  };
}
