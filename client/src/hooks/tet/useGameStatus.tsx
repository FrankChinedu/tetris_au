/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';

const useGameStatus = (rowsCleared: number) => {
  const [score, setScore] = useState<number>(0) as any;
  const [rows, setRows] = useState<number>(0) as any;
  const [level, setLevel] = useState<number>(0)as any;

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    // We have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore((prev: number) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev: number) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};

export default useGameStatus;
