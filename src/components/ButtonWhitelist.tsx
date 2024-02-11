import React, { useState } from "react";
import { WHITELIST_CONTRACT_ID } from "../constants";
import { Button, Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Signer,
} from "@hashgraph/sdk";
import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import { useWallet } from "@buidlerlabs/hashgraph-react-wallets";

interface IButtonWhitelistProps {
  inputAddress: string;
  isConnected: boolean;
}

const ButtonWhitelist: React.FC<IButtonWhitelistProps> = ({
  inputAddress,
  isConnected,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { signer } = useWallet(HashpackConnector);

  const handleClick = async () => {
    setLoading(true);
    try {
      const tx = await new ContractExecuteTransaction()
        .setContractId(WHITELIST_CONTRACT_ID)
        .setGas(100_100)
        .setFunction(
          "whitelist",
          new ContractFunctionParameters().addAddress(inputAddress)
        )
        .freezeWithSigner(signer as Signer);

      const txResponse = await tx.executeWithSigner(signer as Signer);

      const txReceipt = await txResponse.getReceiptWithSigner(signer as Signer);

      const transactionStatus = txReceipt.status;

      toast({
        title: transactionStatus.toString(),
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error?.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Button
      isDisabled={inputAddress === "" && !isConnected}
      variant={"primary"}
      maxW={"50%"}
      minW={"150px"}
      onClick={handleClick}
    >
      {loading ? <Spinner /> : "Whitelist an account"}
    </Button>
  );
};

export default ButtonWhitelist;
