import { useRef, useState } from "react";
export const useCreateGame = (gameSize: number) => {
  const intervalId = useRef<NodeJS.Timeout>();

  const [matrix, setMatrix] = useState(
    Array.from({ length: gameSize }, () =>
      Array.from({ length: gameSize }, () => 0)
    )
  );

  const initBoard = () => {
    setMatrix((prev) =>
      prev.map((row) => row.map(() => (Math.random() > 0.75 ? 1 : 0)))
    );
  };
  const restartBoard = () => {
    const gameBoard = Array.from({ length: gameSize }, () =>
      Array.from({ length: gameSize }, () => 0)
    );
    setMatrix(gameBoard);
  };
  const startGame = () => {
    console.log(intervalId.current);
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        play();
      }, 100);
    }
  };

  const stopGame = () => {
    clearInterval(intervalId.current);
    intervalId.current = undefined;
  };

  const getNextGen = (boardGame: number[][]) => {
    const newBoardGame = Array.from({ length: gameSize }, () =>
      Array.from({ length: gameSize }, () => 0)
    );
    for (let row = 0; row < gameSize; row++) {
      for (let column = 0; column < gameSize; column++) {
        const count = countNeighbours(boardGame, row, column);
        const life = boardGame[row][column];
        // console.log(row, column, count, life);
        if (life === 1 && (count === 2 || count === 3)) {
          newBoardGame[row][column] = 1;
        } else if (life === 0 && count === 3) {
          newBoardGame[row][column] = 1;
        }
      }
    }
    return newBoardGame;
  };

  const play = () => {
    setMatrix((prev) => {
      const newGameBoard = getNextGen(prev);
      return newGameBoard;
    });
  };

  const countNeighbours = (
    gameBoard: number[][],
    row: number,
    column: number
  ) => {
    let neighbours = 0;
    if (row - 1 >= 0 && column - 1 >= 0 && gameBoard[row - 1][column - 1]) {
      neighbours += 1;
    }
    if (row - 1 >= 0 && gameBoard[row - 1][column]) {
      neighbours += 1;
    }
    if (
      row - 1 >= 0 &&
      column + 1 < gameSize &&
      gameBoard[row - 1][column + 1]
    ) {
      neighbours += 1;
    }
    if (column - 1 >= 0 && gameBoard[row][column - 1]) {
      neighbours += 1;
    }
    if (column + 1 < gameSize && gameBoard[row][column + 1]) {
      neighbours += 1;
    }
    if (
      column - 1 >= 0 &&
      row + 1 < gameSize &&
      gameBoard[row + 1][column - 1]
    ) {
      neighbours += 1;
    }
    if (row + 1 < gameSize && gameBoard[row + 1][column]) {
      neighbours += 1;
    }
    if (
      row + 1 < gameSize &&
      column + 1 < gameSize &&
      gameBoard[row + 1][column + 1]
    ) {
      neighbours += 1;
    }
    return neighbours;
  };

  const setCell = (row: number, column: number) => () => {
    setMatrix((prev) => {
      let newBoard = JSON.parse(JSON.stringify(prev));
      newBoard[row][column] = newBoard[row][column] === 1 ? 0 : 1;
      return newBoard;
    });
  };

  return {
    gameMap: matrix,
    setMatrix,
    initBoard,
    startGame,
    stopGame,
    setCell,
    restartBoard,
  };
};
