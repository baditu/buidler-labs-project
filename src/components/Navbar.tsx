import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import Wallet from "./Wallet";
import { Box, useMediaQuery } from "@chakra-ui/react";
import ShowAccountInfo from "./ShowAccountInfo";

const NavBar = () => {
  const [isForBigDevices] = useMediaQuery("(min-width: 560px)");

  return (
    <Box p={"2rem"} display={"flex"} justifyContent={"flex-end"}>
      {isForBigDevices && <ShowAccountInfo connector={HashpackConnector} />}
      <Wallet connector={HashpackConnector} />
    </Box>
  );
};

export default NavBar;
