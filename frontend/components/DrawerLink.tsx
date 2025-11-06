import { Box, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import tv from "../util/themeVariable";
import React, { forwardRef } from "react";

interface DrawerLinkProps {
  icon: React.ReactNode;
  href: string;
  onClose: () => void;
  children: React.ReactNode;
}

const DrawerLink = forwardRef<HTMLButtonElement, DrawerLinkProps>(
  ({ icon, href, onClose, children }, ref) => {
    return (
      <Link href={href} passHref>
        <Button
          cursor="pointer"
          gap="2rem"
          display="flex"
          justifyContent="flex-start"
          w="90%"
          p={6}
          borderRadius={8}
          bg="primary"
          ref={ref}
          tabIndex={1}
          onClick={onClose}
          _hover={{ bg: "#3586a6" }}
          _active={{ bg: "#2d718c" }}
          _focus={{ boxShadow: tv("shadows.alternate") }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            {icon}
          </Box>
          <Heading fontSize={18}>{children}</Heading>
        </Button>
      </Link>
    );
  }
);

DrawerLink.displayName = "DrawerLink";

export default DrawerLink;
