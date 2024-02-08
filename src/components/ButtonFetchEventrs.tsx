/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useState } from "react";
import { TESTNET_BASEURL, WHITELIST_CONTRACT_ID } from "../constants";
import { Button, Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

interface IButtonFetchEventrsProps {
  inputAddress: string;
}

const ButtonFetchEvents: React.FC<IButtonFetchEventrsProps> = ({
  inputAddress,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${TESTNET_BASEURL}/api/v1/contracts/${WHITELIST_CONTRACT_ID}/results/logs`
      );

      const addresses = response.data.logs.map((log: any) => {
        const address = "0x" + log.data.slice(-40);
        return address;
      });

      const isAddressInWhitelist = addresses.find(
        (address: any) => address.toLowerCase() === inputAddress.toLowerCase()
      );

      if (isAddressInWhitelist) {
        toast({
          title: "This address is in whitelist.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "This address is not in whitelist.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: error?.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClick = () => {
    fetchEvents();
  };

  return (
    <Button
      variant={"primary"}
      onClick={handleClick}
      isDisabled={inputAddress === ""}
    >
      {loading ? <Spinner /> : "Check Account"}
    </Button>
  );
};

export default ButtonFetchEvents;
