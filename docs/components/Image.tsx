import { Image as CImage, ImageProps } from "@chakra-ui/react";
import tv from "util/themeVariable";

const Image: React.FC<ImageProps> = props => {
  return (
    <CImage
      boxSize="400px"
      borderRadius={8}
      border={`1px solid ${tv("colors.gray.600")}`}
      m="auto"
      src={props.src}
      alt={props.alt}
      my={6}
      {...props}
    />
  );
};

export default Image;
