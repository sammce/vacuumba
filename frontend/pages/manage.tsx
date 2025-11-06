import {
  Center,
  Heading,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FetchError } from "../api";
import {
  getVacuumData,
  startVacuum,
  stopVacuum,
  VacuumData,
} from "../api/vacuum";
import Header from "../components/Header";
import { useAuth } from "../context/auth";
import useAccessibleKeyPress from "../hooks/useAccessibleKeyPress";
import tv from "../util/themeVariable";

const defaultData = {
  lastVacuum: "",
  vacuumCount: 0,
  temp: 0,
  vacuumOn: false,
};

const ManagePage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [data, setData] = useState<VacuumData>(defaultData);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const handleKeyDown = useAccessibleKeyPress(handleVacuumInteract);

  const toast = useToast();
  function showErrorToast(res: FetchError) {
    toast({
      title: "An error occurred",
      description: res.data.detail,
      status: "error",
      isClosable: true,
    });
  }

  // Get vacuum data from backend, and show error message if any
  function fetchVacuumData() {
    setTimeout(async () => {
      const res = await getVacuumData();

      if (!res.isError) {
        res.data.lastVacuum = new Date(res.data.lastVacuum);
        setData(res.data);
      } else {
        showErrorToast(res);
      }
    }, 500);
  }

  // Get vacuum data on page load
  useEffect(() => {
    if (auth.loggedIn) {
      fetchVacuumData();
    }
  }, []);

  // Calculate time left on current vacuum, and stop vacuum
  // if timer goes to 0
  useEffect(() => {
    let int: NodeJS.Timer | null = null;

    if (data.vacuumOn && typeof data.lastVacuum !== "string") {
      // @ts-ignore
      const diffInS = Math.floor(Math.abs(new Date() - data.lastVacuum) / 1000);
      setTimeRemaining(300 - diffInS);

      int = setInterval(
        () =>
          setTimeRemaining(prev => {
            if (prev - 1 === 0) {
              handleVacuumInteract();
              return prev;
            }
            return prev - 1;
          }),
        1000
      );
      return () => clearInterval(int as NodeJS.Timer);
    } else if (int) {
      clearInterval(int);
    }
  }, [data.lastVacuum, data.vacuumOn]);

  // Prevent unauthorised users from viewing the page
  const unauthorised = typeof window !== "undefined" && !auth.loggedIn;
  useEffect(() => {
    if (unauthorised) {
      (async () => {
        toast({
          title: "Unauthorized",
          description: "You are required to sign in",
          status: "warning",
          isClosable: true,
        });
        await router.push("/login");
      })();
    }
  }, [unauthorised]);

  // Start / stop the vacuum, depending on whether or not it is
  // currently vacuuming.
  async function handleVacuumInteract() {
    setLoading(true);

    const res = await (data.vacuumOn ? stopVacuum() : startVacuum());
    if (!res.isError) {
      setData(defaultData);
      fetchVacuumData();
    } else {
      showErrorToast(res);
    }

    setLoading(false);
  }

  return (
    <HStack minH="100vh" alignItems="stretch">
      <Center w="50%" flexDir="column" gap="1rem">
        <Heading fontSize="2xl">
          Vacuum is{" "}
          <Text as="span" color={data.vacuumOn ? "green.300" : "red.300"}>
            {data.vacuumOn ? "on" : "off"}
          </Text>
        </Heading>

        <Center
          w="210px"
          h="210px"
          borderRadius="50%"
          bg="linear-gradient(to right, #616161, #f5f5f5, #9e9e9e)"
        >
          <Tooltip
            placement="right"
            label={`Turn vacuum ${data.vacuumOn ? "off" : "on"}`}
          >
            <Center
              onClick={handleVacuumInteract}
              onKeyDown={handleKeyDown}
              transition="background-color .2s ease-out"
              bg={data.vacuumOn ? "primary" : "alternateBackground"}
              cursor="pointer"
              h="200px"
              w="200px"
              borderRadius="50%"
              tabIndex={0}
              _hover={{ bg: data.vacuumOn ? "#3586a6" : "#383851" }}
              _active={{ bg: data.vacuumOn ? "#2d718c" : "#4e4e74" }}
              _focus={{
                boxShadow: tv(
                  data.vacuumOn ? "shadows.alternate" : "shadows.thick"
                ),
                outline: 0,
              }}
            >
              {loading ? (
                <Spinner
                  speed="1s"
                  color="primary"
                  size="xl"
                  thickness="4px"
                  emptyColor="gray.600"
                />
              ) : (
                <PowerSettingsNew sx={{ fontSize: 42 }} />
              )}
            </Center>
          </Tooltip>
        </Center>

        {data.vacuumOn && (
          <Heading fontSize="xl">
            Time remaining:{" "}
            <Text as="span" color="primary" fontSize="2xl">
              {`${Math.floor(timeRemaining / 60)}:${
                timeRemaining % 60 < 10 ? 0 : ""
              }${timeRemaining % 60}`}
            </Text>
          </Heading>
        )}
      </Center>

      <Center
        w="50%"
        bg="alternateBackground"
        p={6}
        flexDir="column"
        gap="1rem"
      >
        <Table bg="background" borderRadius={8}>
          <Thead>
            <Tr>
              <Th>Last vacuum</Th>
              <Th>Room temp</Th>
              <Th># of vacuums</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                {(typeof data.lastVacuum !== "string" &&
                  data.lastVacuum
                    .toLocaleString("en-gb")
                    .replace(",", " •")) || (
                  <Spinner speed="0.7s" emptyColor="gray.600" color="primary" />
                )}
              </Td>
              <Td>
                {data.temp ? (
                  <>
                    {data.temp}
                    <Text as="span" color="gray.400">
                      °C
                    </Text>
                  </>
                ) : (
                  <Spinner speed="0.7s" emptyColor="gray.600" color="primary" />
                )}
              </Td>
              <Td>
                {data.vacuumCount || (
                  <Spinner speed="0.7s" emptyColor="gray.600" color="primary" />
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Center>
    </HStack>
  );
};

ManagePage.getLayout = (Children: React.ReactNode) => (
  <>
    <Header />
    {Children}
  </>
);

export default ManagePage;
