import { Box, ButtonProps, Button, Heading } from "@chakra-ui/react";

import tv from "../util/themeVariable";
import { forwardRef } from "react";

type JointProps = ButtonProps & JSX.IntrinsicAttributes;

interface DrawerLinkProps extends JointProps {
  icon: React.ReactNode;
  href: string;
  onClose: () => void;
  children: React.ReactNode;
}

const DrawerLink = forwardRef<HTMLAnchorElement, DrawerLinkProps>(
  ({ icon, href, onClose, children }, ref) => {
    const fullpath =
      typeof window !== "undefined" ? window.location.pathname.split("/") : "";
    let path = "";

    if (fullpath) {
      path = "./" + fullpath[fullpath.length - 1];
    }

    const bg =
      href === path
        ? {
            bg: "secondary",
            hover: "#9073c2",
            active: "#6b5494",
          }
        : {
            bg: "primary",
            hover: "#3586a6",
            active: "#2d718c",
          };

    return (
      <Button
        as="a"
        // @ts-ignore
        ref={ref}
        href={href}
        cursor="pointer"
        gap="1rem"
        display="flex"
        justifyContent="flex-start"
        w="100%"
        p={6}
        pl={3}
        borderRadius={8}
        bg={bg.bg}
        tabIndex={2}
        onClick={onClose}
        _hover={{ bg: bg.hover }}
        _active={{ bg: bg.active }}
        _focus={{ boxShadow: tv("shadows.alternate") }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          {icon}
        </Box>
        <Heading fontSize={18}>{children}</Heading>
      </Button>
    );
  }
);

DrawerLink.displayName = "DrawerLink";

export default DrawerLink;
