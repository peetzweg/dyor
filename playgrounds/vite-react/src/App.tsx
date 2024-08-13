import Accounts from "./components/Accounts";
import Connection from "./components/Connection";
import UseChainDetails from "./components/UseChainDetails";

function App() {
  return (
    <>
      <h1>dyor vite-react playground</h1>

      <Connection />

      <Accounts />

      <UseChainDetails />
    </>
  );
}

export default App;
