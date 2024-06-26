/* eslint-disable no-console */
import type { Prettify } from "../helpers.js";
import { ApiPromise } from "@polkadot/api";
import type { StateCreator } from "zustand";
import type { PolkadotDappProps, PolkadotDappState } from "./index.js";

const createPJSAppsLink = (rpc: string) =>
  `https://polkadot.js.org/apps/?rpc=wss://${rpc}#/explorer`;

// TODO does not provide useApi("Polkadot"), 'chains' prop needs to be 'as const'
export interface APISlice {
  api: Prettify<Record<keyof PolkadotDappProps["chains"], ApiPromise>>;
  error: Prettify<Record<keyof PolkadotDappProps["chains"], Error | undefined>>;
  ready: Prettify<Record<keyof PolkadotDappProps["chains"], boolean>>;
  connected: Prettify<Record<keyof PolkadotDappProps["chains"], boolean>>;
}

export const createAPISlice: (
  props: PolkadotDappProps
) => StateCreator<PolkadotDappState, [], [], APISlice> = (props) => (set) => {
  const api: Partial<APISlice["api"]> = {};

  Object.entries(props.chains).forEach(([key, options]) => {
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

    api[key as keyof APISlice["api"]] = chainAPI;
  });

  return {
    api,
  } as APISlice;
};
