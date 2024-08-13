import { useApi } from "../react.js";

export function useChainDetails(chain: string) {
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
