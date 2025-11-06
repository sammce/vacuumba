import {
  Center,
  Box,
  CenterProps,
  VStack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import Image from "next/image";

const MotionCenter = motion(Center) as React.FC<CenterProps & MotionProps>;

const BuyPage = () => {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          stiffness: 150,
        },
      }}
    >
      <Box pos="relative" w="40%" m="auto">
        <VStack
          borderRadius={8}
          bg="alternateBackground"
          p={6}
          cursor="pointer"
          transition="all .2s ease-out"
          _hover={{
            bg: "#383851",
            transform: "translate(10px, -10px)",
          }}
        >
          <Heading>Vacuumba</Heading>
          <Image
            src="/vacuum-outline.png"
            alt="Robotic vacuum image"
            width={400}
            height={300}
          />
          <Heading
            fontSize="6xl"
            textAlign="center"
            color="gray.500"
            fontWeight="semibold"
          >
            €
            <Text
              as="span"
              color="whiteAlpha.900"
              fontWeight="bold"
              fontSize="7xl"
            >
              99.99
            </Text>
          </Heading>
          <Button w="full" variant="solid">
            Purchase
          </Button>
        </VStack>
        <Box
          top={0}
          bottom={0}
          right={0}
          left={0}
          borderRadius={8}
          zIndex={-1}
          bg="primary"
          pos="absolute"
        />
      </Box>
    </motion.div>
  );
};

export default BuyPage;
