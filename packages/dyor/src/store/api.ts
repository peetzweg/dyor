import { ApiPromise } from "@polkadot/api";
import { createStore, StoreApi } from "zustand";
import type { DyorConfig } from "./index.js";

const createPJSAppsLink = (rpc: string) =>
  `https://polkadot.js.org/apps/?rpc=wss://${rpc}#/explorer`;

// TODO does not provide useApi("Polkadot"), 'chains' prop needs to be 'as const'
export interface ApiState<C extends DyorConfig> {
  api: Record<keyof C["chains"], ApiPromise>;
  error: Record<keyof C["chains"], Error | undefined>;
  ready: Record<keyof C["chains"], boolean>;
  connected: Record<keyof C["chains"], boolean>;
}

export function createApiStore<C extends DyorConfig>(config: C) {
  return createStore<ApiState<C>>((set) => {
    const api: Record<string, ApiPromise> = {};

    Object.entries(config.chains).forEach(([key, options]) => {
      const chainAPI = new ApiPromise(options);

      chainAPI.on("error", (e) => {
        console.error("Error on ", key, e);
        set((state) => ({
          error: {
            [key]: Error("TODO decode error"),
            ...state.error,
          },
          ready: {
            [key]: false,
            ...state.ready,
          },
        }));
      });

      chainAPI.on("disconnected", (e) => {
        console.error("Disconnected on", key, e);
        set((state) => ({
          error: {
            [key]: Error("TODO decode error on console"),
            ...state.error,
          },
          connected: {
            [key]: false,
            ...state.connected,
          },
          ready: {
            [key]: false,
            ...state.ready,
          },
        }));
      });

      chainAPI.on("connected", () => {
        console.info("Connected on", key);
        set((state) => ({
          error: {
            [key]: undefined,
            ...state.error,
          },
          connected: {
            [key]: true,
            ...state.connected,
          },
        }));
      });

      chainAPI.on("ready", () => {
        console.info("Ready on", key);
        set((state) => ({
          ready: {
            [key]: true,
            ...state.ready,
          },
          errors: {
            [key]: undefined,
            ...state.error,
          },
        }));
      });

      api[key] = chainAPI;
    });
    return {
      api,
      error: {},
      ready: {},
      connected: {},
    } as ApiState<C>;
  });
}

export type ApiStore<C extends DyorConfig> = StoreApi<ApiState<C>>;
