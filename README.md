![DYOR Image](dyor.png)


React hooks library for Polkadot SDK chains, inspired by wagmi.

**In the current state the package is just for fun and exploration.**

<!-- [![Build Status](https://img.shields.io/github/actions/workflow/status/peetzweg/dyor/main.yml?branch=main&style=flat&colorA=000000&colorB=000000)](https://github.com/peetzweg/dyor/actions?query=workflow%3ACI) -->
[![Build Size](https://img.shields.io/bundlephobia/minzip/dyor?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=dyor)
[![Version](https://img.shields.io/npm/v/dyor?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/dyor)
[![Downloads](https://img.shields.io/npm/dt/dyor.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/dyor)

## Getting Started

### Installation

```sh
npm install dyor
```

### Setup

You can use this library with any react project. Wrap your React app in the `DyorProvider` and pass the chains you want to use as props.

```ts
import { DyorProvider } from 'dyor'
wss://polkadot-asset-hub-rpc.polkadot.io
function App() {
  return (
    <DyorProvider config={config}>
      {/** ... */}
    </DyorProvider>
  )
}
```

### Usage


```ts
import { useChain } from 'dyor'

function ChainConstants() {
  const AssetHub = useChain('AssetHub')

  ...
}
```