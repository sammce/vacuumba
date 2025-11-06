import { Box, BoxProps } from "@chakra-ui/react";

interface SwatchProps extends BoxProps {
  color: string;
  borderColor?: string;
}

const Swatch: React.FC<SwatchProps> = ({ color, borderColor, ...props }) => (
  <Box
    w={50}
    h={10}
    bg={color}
    borderRadius={6}
    border={`2px solid ${borderColor || "#ffffff"}`}
    {...props}
  />
);

export default Swatch;
