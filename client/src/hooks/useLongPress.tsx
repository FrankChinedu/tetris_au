import { useState, useEffect } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: any;
    if (startLongPress) {
        
      timerId = setInterval(callback, ms);
    } else {
        clearInterval(timerId);
    }

    return () => {
        clearInterval(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}