import { useState, useEffect } from 'react';

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useTimer(
  startTime: number | null,
  isRunning: boolean,
  endTime: number | null,
): string {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!startTime || !isRunning) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isRunning]);

  if (!startTime) return '00:00';

  if (endTime) {
    return formatElapsed(endTime - startTime);
  }

  if (isRunning) {
    return formatElapsed(now - startTime);
  }

  return '00:00';
}
