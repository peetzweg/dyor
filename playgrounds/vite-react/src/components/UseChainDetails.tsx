import { useChainDetails } from "dyor";
import type { Config } from "./main";

function UseChainDetails() {
  const { token, decimals } = useChainDetails<Config>("AssetHub");

  return (
    <>
      <h3>UseChainDetails</h3>
      {token && <p>Symbol: {token}</p>}
      {decimals && <p>Decimals: {decimals}</p>}
    </>
  );
}

export default UseChainDetails;
