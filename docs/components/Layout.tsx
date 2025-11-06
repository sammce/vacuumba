import { Box, HStack, VStack, Link, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import tv from "util/themeVariable";
import Header from "./Header";
import { useNavLink } from "context/activeNavLink";

const NavLink = ({ link, indent }: { link: string; indent: boolean }) => {
  const [activeLink] = useNavLink();
  const formatLink = link.replace("-", " ");
  const active = formatLink === activeLink;

  // Indent is true for nested nav links
  let indentation = 20 + (indent ? 20 : 0);

  return (
    <Link
      _hover={{ textDecoration: "none" }}
      fontWeight={indent ? "normal" : "bold"}
      href={"#" + link}
      tabIndex={1}
      w="full"
      marginTop={"0!important"}
      key={link}
      _focus={{
        boxShadow: "none",
        outline: "none",
        "& > div": {
          boxShadow: tv("shadows.outline"),
        },
      }}
    >
      <Box
        borderRadius="0 6px 6px 0"
        transition="all .2s ease"
        bg={active ? "contrastBackground" : "transparent"}
        borderLeft={
          active
            ? `2px solid ${tv("colors.primary")}`
            : `2px solid ${tv("colors.gray.700")}`
        }
        _focus={{
          boxShadow: "none",
          outline: "none",
          bg: "contrastBackground",
        }}
        _hover={{ bg: "cyan.900" }}
        pl={indentation + "px"}
        pr={2}
        py={2}
      >
        {formatLink}
      </Box>
    </Link>
  );
};

const Layout: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [navLinks, setNavLinks] = useState<{ link: string; indent: boolean }[]>(
    []
  );

  useEffect(() => {
    function handleHashChange() {
      if (
        !window.location.hash ||
        window.location.hash.includes("user-content-fn-")
      )
        return;

      // decode to handle URL safe characters (such as %20)
      // replace spaces with hyphens as IDs cannot contain spaces
      const hash = decodeURI(window.location.hash)
        .replaceAll(" ", "-")
        .replaceAll("", "");
      const linkedElement = document.querySelector(hash);

      if (linkedElement?.tagName === "LI") {
        document.querySelectorAll(".highlighted-link").forEach(child => {
          child.classList.remove("highlighted-link");
        });
        // All footnotes are li elements with the link as the first
        // child
        linkedElement.children[0]?.classList.add("highlighted-link");
      }
    }
    // Call once to handle an existing hash in the URL
    handleHashChange();

    // Setup listener for any future changes
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    // Parse the markdown for all h2 and h3 elements and load them into
    // the navLinks array.
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const links = [];

    for (let child of wrapper.children) {
      // We want to include footnote headings, but they are nested inside
      // of a section with class 'footnotes'
      if (child.classList.contains("footnotes")) {
        child = child.children[0];
      }

      if (["H2", "H3"].includes(child.tagName)) {
        const link = child.id;
        if (!link) continue;
        links.push({ link, indent: child.tagName === "H3" });
      }
    }

    setNavLinks(links);
  }, []);

  return (
    <>
      <Header />
      <HStack
        justify={["center", null, null, "space-between"]}
        align="flex-start"
      >
        <Box
          className="mdx-wrapper"
          w={["100%", null, "70%"]}
          ml={6}
          mt="80px"
          ref={wrapperRef}
        >
          {children}
        </Box>
        <VStack
          pos="sticky"
          top={90}
          as="nav"
          w="25%"
          display={["none", null, null, "block"]}
          pr={5}
        >
          <Text variant="subheading" textAlign="center" mb={3}>
            On this page
          </Text>
          {navLinks.map(({ link, indent }) => (
            <NavLink key={link} link={link} indent={indent} />
          ))}
        </VStack>
      </HStack>
    </>
  );
};

export default Layout;
