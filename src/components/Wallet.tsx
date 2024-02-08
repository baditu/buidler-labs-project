import {
  useWallet,
  HWBridgeConnector,
} from "@buidlerlabs/hashgraph-react-wallets";
import { Button } from "@chakra-ui/react";
import { useCallback, useState } from "react";

interface IProps {
  connector: HWBridgeConnector;
}

const Wallet = ({ connector }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isConnected, connect, disconnect } = useWallet(connector);

  const handleConnect = useCallback(async () => {
    setLoading(true);
    await connect();
    setLoading(false);
  }, [connect]);

  const handleDisconnect = useCallback(async () => {
    setLoading(true);
    await disconnect();
    setLoading(false);
  }, [disconnect]);

  return (
    <div>
      {isConnected ? (
        <Button
          variant={"primary"}
          onClick={handleDisconnect}
          disabled={loading}
        >
          Disconnect
        </Button>
      ) : (
        <Button variant={"primary"} onClick={handleConnect}>
          {loading ? "Loading..." : "Connect"}
        </Button>
      )}
    </div>
  );
};

export default Wallet;
