import {
  Drawer as CDrawer,
  DrawerOverlay,
  DrawerContent,
  Box,
} from "@chakra-ui/react";
import LoginIcon from "@mui/icons-material/Login";
import PowerSettingsIcon from "@mui/icons-material/PowerSettingsNew";
import DrawerLink from "./DrawerLink";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useRef } from "react";
import { useAuth } from "../context/auth";

interface DrawerProps {
  open: boolean;
  hamburgerRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, hamburgerRef }) => {
  const { loggedIn } = useAuth();
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  return (
    <CDrawer
      isOpen={open}
      onClose={onClose}
      initialFocusRef={firstLinkRef}
      finalFocusRef={hamburgerRef}
      placement="left"
      trapFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent bg="alternateBackground">
        <Box
          mt="80px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          {!loggedIn && (
            <DrawerLink
              ref={firstLinkRef}
              href="/login"
              icon={<LoginIcon />}
              onClose={onClose}
            >
              Log in
            </DrawerLink>
          )}
          <DrawerLink href="/buy" icon={<LocalMallIcon />} onClose={onClose}>
            Buy Vacuumba&copy;
          </DrawerLink>
          <DrawerLink
            href="/manage"
            icon={<PowerSettingsIcon />}
            onClose={onClose}
          >
            Manage vacuum
          </DrawerLink>
        </Box>
      </DrawerContent>
    </CDrawer>
  );
};

export default Drawer;
