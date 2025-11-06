import { Center, CenterProps } from "@chakra-ui/react";
import tv from "util/themeVariable";
import StarIcon from "@mui/icons-material/Star";
import classes from "./connect.module.scss";
import { MotionProps, motion } from "framer-motion";

const MotionCenter = motion(Center) as React.FC<MotionProps & CenterProps>;

export const anim = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 100,
      staggerChildren: 0.1,
    },
  },
};

export const colors = {
  empty: {
    bg: "contrastBackground",
    border: `4px solid ${tv("colors.contrastBackground")}`,
  },
  main: {
    bg: "red.500",
    border: `4px solid ${tv("colors.red.500")}`,
  },
  opponent: {
    bg: "yellow.400",
    border: `4px solid ${tv("colors.yellow.400")}`,
  },
  win: {
    border: `4px solid ${tv("colors.green.400")}`,
    inner: <StarIcon sx={{ color: "#000000", fontSize: 32 }} />,
  },
};

type Variants = "mainlight" | "opponentlight" | "mainwin" | "opponentwin";
export type Color = keyof typeof colors | Variants;
export type TurnColor = Exclude<Color, "empty" | Variants>;

interface PieceProps {
  color: Color;
}

const Piece: React.FC<PieceProps> = ({ color }) => {
  let { ...pieceColor } =
    colors[
      color.replace("light", "").replace("win", "") as Exclude<
        keyof typeof colors,
        "win"
      >
    ];

  let inner = null;

  if (color.includes("win")) {
    inner = colors.win.inner;
    pieceColor.border = colors.win.border;
  }

  return (
    <MotionCenter
      className={
        classes.piece + (color.includes("light") ? " " + classes.pulsate : "")
      }
      h="full"
      w="full"
      {...pieceColor}
      borderRadius="50%"
    >
      {inner}
    </MotionCenter>
  );
};

export default Piece;
