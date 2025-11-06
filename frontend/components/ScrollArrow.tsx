import { ArrowDownIcon } from "@chakra-ui/icons";
import useScroll from "../hooks/useScroll";
import classes from "./ScrollArrow.module.css";
import tv from "../util/themeVariable";

interface ScrollArrowProps {
  contentRef: React.RefObject<HTMLElement>;
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ contentRef }) => {
  const scrollToContent = useScroll(contentRef);

  return (
    <ArrowDownIcon
      w={16}
      h={16}
      cursor="pointer"
      color="primary"
      className={classes.arrow}
      onClick={scrollToContent}
      tabIndex={0}
      borderRadius="full"
      role="button"
      aria-label="Scroll to main content"
      _focus={{ outline: 0, boxShadow: tv("shadows.outline") }}
    />
  );
};

export default ScrollArrow;
