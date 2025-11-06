import { Button, HStack, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import Drawer from "./Drawer";
import NextLink from "next/link";
import tv from "../util/themeVariable";
import { useAuth } from "../context/auth";

const Header = () => {
  const { loggedIn, logout } = useAuth();
  const { onClose, onToggle, isOpen } = useDisclosure();
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const [bg, setBg] = useState<string | undefined>(undefined);

  const handleScroll = () => {
    const lastY = window.scrollY;

    window.requestAnimationFrame(() => {
      if (lastY > 50) {
        setBg("rgba(26 32 44 / .85)");
      } else {
        setBg(undefined);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HStack
        justify="space-between"
        h={70}
        w="full"
        pos="fixed"
        top={0}
        px="1.6rem"
        zIndex={1500}
        transition="background-color .35s ease"
        bg={bg}
      >
        <HStack gap={1}>
          <Hamburger
            onToggle={onToggle}
            open={isOpen}
            onClick={onToggle}
            ref={hamburgerRef}
            tabIndex={1}
          />
          <NextLink href="/" passHref>
            <Link
              borderRadius={6}
              px={2}
              _focus={{ boxShadow: tv("shadows.alternate") }}
            >
              <Heading>vacuumba</Heading>
            </Link>
          </NextLink>
        </HStack>
        <HStack gap=".8rem">
          {loggedIn ? (
            <Button
              _focus={{ boxShadow: tv("shadows.alternate") }}
              onClick={logout}
            >
              Log out
            </Button>
          ) : (
            <>
              <NextLink href="/login" passHref>
                <Button
                  _focus={{ boxShadow: tv("shadows.alternate") }}
                  variant="ghost"
                >
                  Login
                </Button>
              </NextLink>
              <NextLink href="/login?signup" passHref>
                <Button _focus={{ boxShadow: tv("shadows.alternate") }}>
                  Sign Up
                </Button>
              </NextLink>
            </>
          )}
        </HStack>
      </HStack>

      <Drawer hamburgerRef={hamburgerRef} onClose={onClose} open={isOpen} />
    </>
  );
};

export default Header;
