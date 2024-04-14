"use client";
import { Cell } from "@/components/cell";
import { Button } from "@/components/ui/button";
import { useCreateGame } from "@/utils/game-of-life";
import React from "react";
export default function Home() {
  const { gameMap, startGame, initBoard, stopGame, setCell, restartBoard } =
    useCreateGame(100);
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center ">
      <div className="flex gap-3 my-3">
        <Button onClick={initBoard}>Init board </Button>
        <Button onClick={restartBoard}>Restart Board </Button>
        <Button onClick={startGame}>Start Game </Button>
        <Button onClick={stopGame}>Stop Game </Button>
      </div>
      <div className="game flex flex-col">
        {gameMap.map((row, rowIdx) => (
          <div className="flex " key={rowIdx}>
            {row.map((cell: number, columnIdx: number) => (
              <Cell
                isAlive={cell}
                setCell={setCell}
                column={columnIdx}
                row={rowIdx}
                key={`${rowIdx}-${columnIdx}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
