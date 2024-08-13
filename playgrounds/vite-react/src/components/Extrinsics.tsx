import { useApi, useExtrinsicAs } from "dyor";
import type { Config } from "./main";

function Extrinsic() {
  const People = useApi<Config>("People");

  const { mutate: apply, isPending } = useExtrinsicAs(
    People.tx.proofOfInk.apply,
    accounts.length ? accounts[0].address : ""
  );
  const onClick = useCallback(() => {
    apply([]);
  }, [selectedAccount]);

  return (
    <>
      <h2>Extrinsic</h2>

      <button onClick={onClick}>Submit</button>
    </>
  );
}

export default Extrinsic;
