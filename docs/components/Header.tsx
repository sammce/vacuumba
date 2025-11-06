import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Heading,
  useDisclosure,
  Link,
  Text,
  Divider,
} from "@chakra-ui/react";
import Hamburger from "./Hamburger";
import { useRef } from "react";
import tv from "util/themeVariable";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import DrawerLink from "./DrawerLink";
import BrushIcon from "@mui/icons-material/Brush";
import CodeIcon from "@mui/icons-material/Code";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import GridOnIcon from "@mui/icons-material/GridOn";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        h="70px"
        display="flex"
        pos="fixed"
        top={0}
        w="full"
        px={6}
        py={3}
        gap="2rem"
        zIndex={1500}
        alignItems="center"
        bg="contrastBackground"
        borderBottom={`1px solid ${tv("colors.gray.500")}`}
      >
        <Hamburger
          onClick={onToggle}
          open={isOpen}
          onToggle={onToggle}
          ref={hamburgerRef}
        />

        <Link href="./index.html" borderRadius={6} px={2} tabIndex={1}>
          <Heading onKeyDown={onClose}>vacuumba report</Heading>
        </Link>
      </Box>
      <Drawer
        trapFocus
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={firstLinkRef}
        finalFocusRef={hamburgerRef}
      >
        <DrawerOverlay />
        <DrawerContent mt="70px" pt={5} bg="contrastBackground">
          <Box
            display="flex"
            alignItems="stretch"
            gap="1rem"
            flexDirection="column"
            px={4}
            h="full"
            pb={4}
          >
            <DrawerLink
              ref={firstLinkRef}
              href="./index.html"
              onClose={onClose}
              icon={<HomeIcon />}
            >
              Home
            </DrawerLink>
            <Divider />
            <Text variant="subheading">Stages</Text>
            <DrawerLink
              href="./plan.html"
              onClose={onClose}
              icon={<MenuBookIcon />}
            >
              Investigation &amp; Plan
            </DrawerLink>
            <DrawerLink
              href="./design.html"
              onClose={onClose}
              icon={<BrushIcon />}
            >
              Design
            </DrawerLink>
            <DrawerLink
              href="./implementation.html"
              onClose={onClose}
              icon={<CodeIcon />}
            >
              Implementation &amp; Test...
            </DrawerLink>
            <DrawerLink
              href="./evaluation.html"
              onClose={onClose}
              icon={<FindInPageIcon />}
            >
              Evaluation
            </DrawerLink>
            <Divider />
            <Text variant="subheading">Bonus</Text>
            <DrawerLink
              href="./connect.html"
              onClose={onClose}
              icon={<GridOnIcon />}
            >
              Connect Four
            </DrawerLink>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
