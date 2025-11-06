import { Box } from "@chakra-ui/react";
import Header from "./Header";

const Layout = (page: React.ReactElement) => {
  return (
    <>
      <Header />
      <Box mt="70px">{page}</Box>
    </>
  );
};

export default Layout;
