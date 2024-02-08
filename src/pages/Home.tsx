import {
  Box,
  Button,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Signer,
} from "@hashgraph/sdk";
import { ChangeEvent, useState } from "react";
import { WHITELIST_CONTRACT_ID } from "../constants";
import { useWallet } from "@buidlerlabs/hashgraph-react-wallets";
import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import ButtonFetchEvents from "../components/ButtonFetchEventrs";
import ButtonGetMessage from "../components/ButtonGetMessage";

const Home = () => {
  const [address, setAddress] = useState<string>("");
  const [isAddressInvalid, setIsAddressInvalid] = useState<boolean>(false);

  const { signer } = useWallet(HashpackConnector);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setIsAddressInvalid(false);
  };

  const isValidEthAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleBlur = () => {
    if (!address || !isValidEthAddress(address)) {
      setIsAddressInvalid(true);
    }
  };

  const handleWhitelist = async () => {
    try {
      const tx = await new ContractExecuteTransaction()
        .setContractId(WHITELIST_CONTRACT_ID)
        .setGas(100_100)
        .setFunction(
          "whitelist",
          new ContractFunctionParameters().addAddress(address)
        )
        .freezeWithSigner(signer as Signer);

      const txResponse = await tx.executeWithSigner(signer as Signer);

      const txReceipt = await txResponse.getReceiptWithSigner(signer as Signer);

      const transactionStatus = txReceipt.status;

      console.log(transactionStatus);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      p={"5rem"}
      w={"100%"}
      h={"88vh"}
    >
      <Heading as="h1" color={"#12372A"} pb={"2rem"}>
        Interaction With Whitelist Contract
      </Heading>
      <FormControl
        maxW={"50%"}
        isRequired
        isInvalid={isAddressInvalid}
        onBlur={handleBlur}
      >
        <FormLabel color={"#12372A"}>Account Address</FormLabel>
        <Input
          border={"2px solid #12372A"}
          bg={"#ADBC9F"}
          _focus={{ borderColor: "#ADBC9F", boxShadow: "0 0 0 2px #ADBC9F" }}
          type="text"
          onChange={handleChange}
        />
        <FormErrorMessage color={"#FF5252"}>Required</FormErrorMessage>
      </FormControl>
      <HStack spacing={"2rem"} py={"2rem"}>
        <Button variant={"primary"} onClick={handleWhitelist}>
          Whitelist an account
        </Button>
        <ButtonFetchEvents inputAddress={address} />
        <ButtonGetMessage />
      </HStack>
    </Box>
  );
};

export default Home;
