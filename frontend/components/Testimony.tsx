import { motion } from "framer-motion";
import { Box, Avatar, HStack, VStack, Text, Heading } from "@chakra-ui/react";

import type { BoxProps } from "@chakra-ui/react";
import type { MotionProps } from "framer-motion";
import tv from "../util/themeVariable";

// Animations for each customer testimony box
const childAnimations = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      stiffness: 50,
    },
  },
};

const MotionBox = motion(Box) as React.FC<MotionProps & BoxProps>;

interface TestimonyProps {
  imageUrl: string;
  name: string;
  heading: string;
  description: string;
}

const Testimony: React.FC<TestimonyProps> = ({
  name,
  imageUrl,
  heading,
  description,
  children,
}) => {
  return (
    <MotionBox
      variants={childAnimations}
      h="full"
      w={{ base: "95%", md: "75%" }}
      p={{ base: 5, md: 10 }}
      borderRadius={18}
      bg="alternateBackground"
    >
      <HStack
        gap={{ base: "1rem", md: "2rem" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Avatar size="2xl" name={name} src={imageUrl} loading="eager" />
        <VStack>
          <Heading size="lg" alignSelf="start">
            <span
              style={{
                fontFamily: "Georgia",
                color: tv("colors.tertiary"),
              }}
            >
              &ldquo;
            </span>
            {heading}
            <span
              style={{
                fontFamily: "Georgia",
                color: tv("colors.tertiary"),
              }}
            >
              &rdquo;
            </span>
          </Heading>
          <Text>{children}</Text>
          <Text
            color="gray.400"
            fontSize="0.8rem"
            textAlign="left"
            alignSelf="start"
          >
            {name} &bull; {description}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
};

export default Testimony;
