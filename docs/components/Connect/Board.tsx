import {
  Box,
  Button,
  Heading,
  HStack,
  BoxProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Swatch from "components/Swatch";
import { useEffect, useState } from "react";
import Column from "./Column";
import { colors, anim } from "./Piece";
import type { TurnColor, Color } from "./Piece";
import tv from "util/themeVariable";
import { motion, MotionProps } from "framer-motion";

const MotionHStack = motion(HStack) as React.FC<MotionProps & BoxProps>;

const winDirections = {
  down: [0, 1], // |
  horizontal: [-1, 0], // -
  diagonal_down: [-1, -1], // \
  diagonal_up: [-1, 1], // /
};

function markerInBounds(x: number, y: number, dx: number, dy: number) {
  return x + dx >= 0 && x + dx < width && y + dy >= 0 && y + dy < height;
}

const Card: React.FC = ({ children }) => (
  <Box bg="contrastBackground" borderRadius={12} p={4} w="full">
    {children}
  </Box>
);

function validateLoadedStats(loadedStats: Record<string, unknown>): boolean {
  return (
    Object.keys(loadedStats).length === 3 &&
    "gamesPlayed" in loadedStats &&
    "mainWins" in loadedStats &&
    "opponentWins" in loadedStats
  );
}

interface Stats {
  gamesPlayed: number;
  mainWins: number;
  opponentWins: number;
}

const width = 7;
const height = 6;

/**
 * Renders a connect 4 board which handles the game win/draw logic.
 * Also manages the 2d array representing the board pieces.
 */
const Board = () => {
  const toast = useToast();

  const [winner, setWinner] = useState<TurnColor | "empty" | null>(null);
  const [pieces, setPieces] = useState<Color[][]>(
    [...Array(7)].map(() => Array(6).fill("empty"))
  );
  const [currentTurn, setCurrentTurn] = useState<TurnColor>("main");

  const [stats, setStats] = useState<Stats>({
    gamesPlayed: 0,
    mainWins: 0,
    opponentWins: 0,
  });

  // Load stats from local storage
  useEffect(() => {
    const prevStats = localStorage.getItem("stats");

    const loadedStats = JSON.parse(prevStats || "{}");

    if (validateLoadedStats(loadedStats)) {
      setStats(loadedStats);
    }
  }, []);

  function handleColumnClick(col: number, row: number) {
    return () => {
      const coords = checkWin(col, row);

      if (coords) {
        handleWin(coords);
      } else if (checkDraw()) {
        handleDraw();
      } else {
        setCurrentTurn(turn => (turn === "main" ? "opponent" : "main"));
      }
    };
  }

  function columnFactory(index: number) {
    return (callback: (previous: Color[]) => Color[]) => {
      setPieces(previous => {
        const mutable = [...previous];
        mutable[index] = callback([...previous[index]]);
        return mutable;
      });
    };
  }

  function resetGame() {
    setPieces([...Array(7)].map(() => Array(6).fill("empty")));
    setCurrentTurn("main");
    setWinner(null);
  }

  function navigateBoard(
    direction: keyof typeof winDirections,
    x: number,
    y: number
  ): [boolean, number[][]] {
    const [dx, dy] = winDirections[direction];

    while (
      markerInBounds(x, y, dx, dy) &&
      pieces[x + dx][y + dy].replace("light", "") === currentTurn
    ) {
      x += dx;
      y += dy;
    }

    let coords = [[x, y]];

    while (
      markerInBounds(x, y, -dx, -dy) &&
      pieces[x - dx][y - dy].replace("light", "") === currentTurn
    ) {
      x -= dx;
      y -= dy;

      coords.push([x, y]);
    }

    return [coords.length >= 4, coords];
  }

  function checkWin(col: number, row: number): number[][] | false {
    for (const direction in winDirections) {
      const [win, coords] = navigateBoard(
        direction as keyof typeof winDirections,
        col,
        row
      );
      if (win) return coords;
    }
    return false;
  }

  function checkDraw() {
    for (const column of pieces) {
      for (const piece of column) {
        if (piece === "empty") return false;
      }
    }

    return true;
  }

  function handleDraw() {
    setWinner("empty");

    const mutStats = { ...stats };
    mutStats.gamesPlayed += 1;

    localStorage.setItem("stats", JSON.stringify(mutStats));
    setStats(mutStats);
  }

  function handleWin(coords: number[][]) {
    setWinner(currentTurn);

    if (coords.length > 4) {
      toast({
        title: "Wow, I'm impressed",
        description: `You connected ${coords.length} in a row!`,
        status: "success",
      });
    }
    setPieces(prev => {
      const mut = [...prev];
      for (const [col, row] of coords) {
        mut[col][row] = (currentTurn + "win") as "mainwin" | "opponentwin";
      }

      return mut;
    });

    const mutStats = { ...stats };
    mutStats.gamesPlayed += 1;

    if (currentTurn === "main") {
      mutStats.mainWins += 1;
    } else {
      mutStats.opponentWins += 1;
    }

    localStorage.setItem("stats", JSON.stringify(mutStats));
    setStats(mutStats);
  }

  return (
    <HStack
      h="calc(95vh - 70px)"
      m="auto"
      mt="70px"
      w={["95%", "60%", "95%"]}
      py={6}
      justify={["flex-start", null, "center"]}
      gap={16}
      flexDir={["column", null, "row"]}
    >
      <MotionHStack
        p={[1, 2, 4]}
        h="full"
        minH={["40vh", "60vh"]}
        w={["full", null, "45%"]}
        bg="primary"
        borderRadius={16}
        justifyContent="space-evenly"
        pointerEvents={winner ? "none" : undefined}
        variants={anim}
        initial="hidden"
        animate="visible"
      >
        {pieces.map((pieces, columnIndex) => (
          <Column
            winner={winner}
            key={columnIndex}
            pieces={pieces}
            currentTurn={currentTurn}
            index={columnIndex}
            onClick={handleColumnClick}
            setPieces={columnFactory(columnIndex)}
          />
        ))}
      </MotionHStack>
      <VStack gap={3}>
        <Card>
          <HStack justify="space-between" p={4} gap={3} alignItems="center">
            <Heading textAlign="center">Connect 4</Heading>
            <Button
              _focus={{ boxShadow: tv("shadows.error") }}
              onClick={resetGame}
              color="red.400"
            >
              Restart Game
            </Button>
          </HStack>

          <VStack>
            <Heading
              size="sm"
              letterSpacing="wider"
              color={winner && winner !== "empty" ? "green.400" : "gray.400"}
              textTransform="uppercase"
            >
              {winner ? (winner === "empty" ? "draw" : "winner") : "next turn"}
            </Heading>
            <Swatch
              borderRadius={6}
              color={
                winner === "empty"
                  ? "gray.200"
                  : (colors[winner || currentTurn] as { bg: string }).bg
              }
            />
          </VStack>
        </Card>
        <Card>
          <Heading textAlign="center">How to play</Heading>
          <Text p={2}>
            Hover your cursor over a column to preview your move. <br />
            Click to drop your piece.
          </Text>
        </Card>
        <Card>
          <Heading textAlign="center">Stats</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Games played</Th>
                <Th>
                  <HStack>
                    <Swatch
                      w={6}
                      h={6}
                      borderRadius={6}
                      color={colors.main.bg}
                    />{" "}
                    <Text>wins</Text>
                  </HStack>
                </Th>
                <Th>
                  <HStack>
                    <Swatch
                      w={6}
                      h={6}
                      borderRadius={6}
                      color={colors.opponent.bg}
                    />{" "}
                    <Text>wins</Text>
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{stats.gamesPlayed}</Td>
                <Td textAlign="center">{stats.mainWins}</Td>
                <Td textAlign="center">{stats.opponentWins}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Card>
      </VStack>
    </HStack>
  );
};

export default Board;
