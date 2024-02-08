import {
  HWBridgeConnector,
  useAccountId,
  useBalance,
} from "@buidlerlabs/hashgraph-react-wallets";
import { HStack, Text } from "@chakra-ui/react";
import { useMemo } from "react";

interface IProps {
  connector: HWBridgeConnector;
}

const ShowAccountInfo = ({ connector }: IProps) => {
  const { balance } = useBalance(connector);
  const { accountId } = useAccountId(connector);

  const account = useMemo(() => {
    if (accountId !== undefined) {
      return `${accountId?.realm}.${accountId?.shard}.${accountId?.num}`;
    }
  }, [accountId]);

  return (
    <HStack alignItems={"flex-start"} pr={"0.5rem"}>
      {account !== undefined && (
        <Text
          borderRadius={"6px"}
          padding={"0.5rem"}
          bgColor={"#12372A"}
          color={"white"}
          fontWeight={"600"}
        >{`Account: ${account}`}</Text>
      )}
      {balance?.hbars !== undefined && (
        <Text
          borderRadius={"6px"}
          padding={"0.5rem"}
          bgColor={"#12372A"}
          color={"white"}
          fontWeight={"600"}
        >{`Balance: ${balance.hbars}`}</Text>
      )}
    </HStack>
  );
};

export default ShowAccountInfo;
