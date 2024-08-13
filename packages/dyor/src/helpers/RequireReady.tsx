import * as React from "react";
import { useMemo } from "react";
import { useDyorApi } from "../react.js";
import { DyorConfig } from "../store/index.js";

interface Props<C extends DyorConfig> {
  chains: (keyof C["chains"])[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RequireReady<C extends DyorConfig>({
  chains,
  children,
  fallback,
}: Props<C>) {
  const ready = useDyorApi((state) => state.ready);

  const isReady = useMemo(() => {
    return !!ready && chains.every((c) => ready[c as any]);
  }, [ready, chains]);

  if (!isReady) {
    if (fallback) return <>{fallback}</>;
    return null;
  }

  return <>{children}</>;
}
