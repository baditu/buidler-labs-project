import { Box, Flex, FormErrorMessage, Heading, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import ButtonFetchEvents from "../components/ButtonFetchEventrs";
import ButtonGetMessage from "../components/ButtonGetMessage";
import ButtonWhitelist from "../components/ButtonWhitelist";
import { useAccountId } from "@buidlerlabs/hashgraph-react-wallets";
import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import { useMediaQuery } from "@chakra-ui/react";

const Home = () => {
  const [address, setAddress] = useState<string>("");
  const [isAddressInvalid, setIsAddressInvalid] = useState<boolean>(false);
  const { accountId } = useAccountId(HashpackConnector);

  const [isForBigDevices] = useMediaQuery("(min-width: 670px)");

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

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      p={"5rem"}
      w={"100%"}
      h={"88vh"}
    >
      <Heading
        fontSize={isForBigDevices ? "32px" : "18px"}
        textAlign={"center"}
        as="h1"
        color={"#12372A"}
        pb={"2rem"}
      >
        Interaction With Whitelist Contract
      </Heading>
      <FormControl
        maxWidth={"500px"}
        isRequired
        isInvalid={isAddressInvalid}
        onBlur={handleBlur}
        style={{ margin: "0 auto" }}
      >
        <FormLabel
          fontSize={isForBigDevices ? "16px" : "12px"}
          color={"#12372A"}
          whiteSpace={"nowrap"}
        >
          Account Address
        </FormLabel>
        <Input
          border={"2px solid #12372A"}
          bg={"#ADBC9F"}
          _focus={{ borderColor: "#ADBC9F", boxShadow: "0 0 0 2px #ADBC9F" }}
          type="text"
          onChange={handleChange}
          minW={"150px"}
          maxW={"500px"}
        />
        <FormErrorMessage color={"#FF5252"}>Required</FormErrorMessage>
      </FormControl>
      <Flex
        w={"100%"}
        maxW={"1200px"}
        h={"50%"}
        flexDirection={isForBigDevices ? "row" : "column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <ButtonWhitelist
          inputAddress={address}
          isConnected={accountId !== undefined}
        />
        <ButtonFetchEvents
          inputAddress={address}
          isConnected={accountId !== undefined}
        />
        <ButtonGetMessage isConnected={accountId !== undefined} />
      </Flex>
    </Box>
  );
};

export default Home;
