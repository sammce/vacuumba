import { useEffect, useMemo, useRef, useState } from "react";
import type { Color, TurnColor } from "./Piece";
import Piece, { anim } from "./Piece";
import { VStack, BoxProps } from "@chakra-ui/react";
import classes from "./connect.module.scss";
import useAccessibleKeyPress from "hooks/useAccessibleKeyPress";
import { motion, MotionProps } from "framer-motion";

const MotionVStack = motion(VStack) as React.FC<MotionProps & BoxProps>;

interface ColumnProps {
  index: number;
  currentTurn: TurnColor;
  onClick: (col: number, row: number) => () => void;
  pieces: Color[];
  setPieces: (callback: (previous: Color[]) => Color[]) => void;
  winner: TurnColor | "empty" | null;
}

const Column: React.FC<ColumnProps> = ({
  index,
  currentTurn,
  onClick,
  pieces,
  setPieces,
  winner,
}) => {
  const [nextPiece, setNextPiece] = useState<number>(5);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (const piece of pieces) {
      if (piece !== "empty") return;
    }

    setNextPiece(5);
  }, [pieces]);

  // Set piece in this column to a certain column
  // Called without arguments, it places the currently hovered piece
  function updatePieces(piece = nextPiece, to: Color = currentTurn) {
    setPieces(pieces => {
      const mut = [...pieces];
      mut[piece] = to;
      return mut;
    });
  }

  function handleColumnClick() {
    updatePieces();
    setNextPiece(prev => {
      updatePieces(
        prev - 1,
        currentTurn === "main" ? "opponentlight" : "mainlight"
      );
      return prev - 1;
    });
    onClick(index, nextPiece)();
  }

  const handleKeyPress = useAccessibleKeyPress(() => {
    handleColumnClick();
  });

  function handleMouseEnter() {
    updatePieces(
      nextPiece,
      (currentTurn + "light") as "opponentlight" | "mainlight"
    );
  }

  function handleMouseLeave() {
    updatePieces(nextPiece, "empty");
  }

  const allowEvents = useMemo(
    () =>
      !winner && pieces.some(piece => !["main", "opponent"].includes(piece)),
    [winner, pieces]
  );

  return (
    <MotionVStack
      // @ts-ignore
      ref={stackRef}
      variants={anim}
      gap={[1, 2, 3]}
      borderRadius={12}
      p={[1, null, 2]}
      className={classes[currentTurn]}
      w="full"
      h="full"
      pointerEvents={allowEvents ? undefined : "none"}
      tabIndex={allowEvents ? 0 : undefined}
      outline={0}
      cursor="pointer"
      justify="space-evenly"
      onFocus={allowEvents ? handleMouseEnter : undefined}
      onBlur={allowEvents ? handleMouseLeave : undefined}
      onKeyUp={allowEvents ? handleKeyPress : undefined}
      onClick={handleColumnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {pieces.map((color, key) => (
        <Piece key={key} color={color} />
      ))}
    </MotionVStack>
  );
};

export default Column;
