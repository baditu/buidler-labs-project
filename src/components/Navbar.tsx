import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import Wallet from "./Wallet";
import { Box } from "@chakra-ui/react";
import ShowAccountInfo from "./ShowAccountInfo";

const NavBar = () => {
  return (
    <Box p={"2rem"} display={"flex"} justifyContent={"flex-end"}>
      <ShowAccountInfo connector={HashpackConnector} />
      <Wallet connector={HashpackConnector} />
    </Box>
  );
};

export default NavBar;
