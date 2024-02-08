import viteLogo from "/vite.svg";
import { HWBridgeProvider } from "@buidlerlabs/hashgraph-react-wallets";
import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import Layout from "./components/Layout";
import AppRouter from "./AppRouter";

const metadata = {
  description: "Buidler Labs Project",
  icons: [viteLogo],
  name: "Buidler Labs Project",
  url: location.href,
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HWBridgeProvider
        network="testnet"
        metadata={metadata}
        connectors={[HashpackConnector]}
        multiSession={false}
      >
        <Layout>
          <AppRouter />
        </Layout>
      </HWBridgeProvider>
    </ChakraProvider>
  );
}

export default App;
