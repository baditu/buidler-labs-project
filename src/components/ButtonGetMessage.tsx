/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useState } from "react";
import {
  MESSAGE_SLOT,
  TESTNET_BASEURL,
  WHITELIST_CONTRACT_ID,
} from "../constants";
import { Button, Spinner } from "@chakra-ui/react";
import { hexToString } from "../lib/hexToString";
import { useToast } from "@chakra-ui/react";

const ButtonGetMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${TESTNET_BASEURL}/api/v1/contracts/${WHITELIST_CONTRACT_ID}/state`,
        {
          params: {
            slot: MESSAGE_SLOT,
          },
        }
      );

      const hexMessage = response.data.state[0].value;
      const stringMessage = hexToString(hexMessage.substr(2));

      toast({
        title: stringMessage,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

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
    <Button variant={"primary"} onClick={handleClick}>
      {loading ? <Spinner /> : "Show Message"}
    </Button>
  );
};

export default ButtonGetMessage;
