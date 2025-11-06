import { Box, VStack } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import useAccessibleKeyPress from "../hooks/useAccessibleKeyPress";
import classes from "./Hamburger.module.css";
import tv from "../util/themeVariable";

interface HamburgerProps extends BoxProps {
  open: boolean;
  onToggle: () => void;
}

const Hamburger = forwardRef<HTMLDivElement, HamburgerProps>(
  ({ open, onToggle, ...props }, ref) => {
    const handleKeyPress = useAccessibleKeyPress(onToggle);

    return (
      <VStack
        alignItems="start"
        role="group"
        aria-label="Open the navigation menu"
        cursor="pointer"
        borderRadius={4}
        _focus={{
          boxShadow: tv("shadows.alternate"),
          outline: 0,
        }}
        tabIndex={0}
        zIndex={1500}
        p={2}
        gap="0"
        onKeyPress={handleKeyPress}
        {...props}
        ref={ref}
      >
        <Box
          w="32px"
          h="2px"
          bg="white"
          transition="width .3s ease, transform .45s ease .45s"
          borderRadius={5}
          className={open ? classes.hamburgerTop : undefined}
        />
        <Box
          w="20px"
          h="2px"
          bg="white"
          borderRadius={5}
          _groupHover={{ w: "32px" }}
          _groupFocus={{ w: "32px" }}
          transition=" all .3s ease"
          opacity={open ? 0 : 1}
        />
        <Box
          transition="all .3s ease, transform .45s ease"
          w="32px"
          h="2px"
          bg="white"
          borderRadius={5}
          className={open ? classes.hamburgerBottom : undefined}
        />
      </VStack>
    );
  }
);

Hamburger.displayName = "Hamburger";

export default Hamburger;
