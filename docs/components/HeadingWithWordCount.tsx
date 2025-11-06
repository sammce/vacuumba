import { VStack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const HeaderWithWordCount: React.FC = ({ children }) => {
  const [wordCount, setWordCount] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.pathname.endsWith("index.html")) return;

    const wrapper = stackRef.current!.parentElement;

    if (!wrapper) return;

    let wc = 0;

    for (const child of wrapper.children) {
      if (child.tagName === "P") {
        wc += child.innerHTML.split(" ").length;
      } else if (child.tagName === "UL") {
        for (const _child of child.children) {
          if (_child.tagName === "LI") {
            wc += _child.innerHTML.split(" ").length;
          }
        }
      }
    }

    setWordCount(wc);
  }, []);

  return (
    <VStack ref={stackRef}>
      <h1 style={{ lineHeight: 1.2 }}>{children}</h1>
      {wordCount !== 0 && (
        <Text mt={0} color="gray.500" fontSize="2xl">
          Word count:{" "}
          <Text as="span" fontWeight="bold" color="primary">
            {wordCount}
          </Text>
        </Text>
      )}
    </VStack>
  );
};

export default HeaderWithWordCount;
