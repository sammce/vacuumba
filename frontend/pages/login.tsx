import { HStack, Box, Center, Heading } from "@chakra-ui/react";
import useQueryParam from "../hooks/useQueryParam";
import SignUpForm from "../components/Forms/Signup";
import LoginForm from "../components/Forms/Login";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import useNextListener from "../hooks/useNextListener";

const LoginPage = () => {
  const { loggedIn } = useAuth();
  const [rotate, setRotate] = useState(false);

  useQueryParam(
    params => setRotate(!loggedIn && typeof params.signup == "string"),
    ["signup"]
  );
  useNextListener(loggedIn);

  useEffect(() => {
    setRotate(rotate => rotate && !loggedIn);
  }, [loggedIn]);

  return (
    <HStack
      h="100vh"
      w="full"
      mt={{ base: "0", md: "-70px" }}
      display="flex"
      justify="center"
      flexDirection={{ base: "column-reverse", md: "row" }}
    >
      <Box w={{ base: "100%", md: "40%" }} h="full" bg="primary">
        <Center h="full">
          <Heading textAlign="center">
            Disover a new world of home improvement
          </Heading>
        </Center>
      </Box>

      <Center
        w={{ base: "100%", md: "60%" }}
        pos="relative"
        transform={`rotateY(${rotate ? "180deg" : "0"})`}
        transitionDuration=".8s"
        style={{ transformStyle: "preserve-3d" }}
      >
        {loggedIn ? (
          <Center w="full" h="full">
            <Heading>You&apos;re already logged in!</Heading>
          </Center>
        ) : (
          <>
            <LoginForm rotate={rotate} />
            <SignUpForm rotate={rotate} />
          </>
        )}
      </Center>
    </HStack>
  );
};

export default LoginPage;
