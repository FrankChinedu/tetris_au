import React, { useEffect } from 'react'


const useAnimationFrame = (callback: () => void, dropTime: number | null) => {

  const requestRef = React.useRef() as any;
  const previousTimeRef = React.useRef() as any;
  const dropCounter = React.useRef(0) as any;

  const animate = (time: any) => {
    if (previousTimeRef.current !== undefined) {
      // console.log('previousTimeRef.current', previousTimeRef.current);
      // console.log('time', time);
      const deltaTime = time - previousTimeRef.current as number;
      // console.log('deltaTime', deltaTime);
      dropCounter.current += deltaTime;
      // console.log('dropCounter.current', dropCounter.current);
      // if()
      if(dropTime && dropCounter.current > dropTime) {
        dropCounter.current = 0;
        // console.log('calledddd');
        // console.log('callback', callback)
        callback()
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    console.log('createdddd');
    if(dropTime) {
      requestRef.current = requestAnimationFrame(animate as any);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [dropTime]);
};

export function useInterval(callback: () => void, delay: number| null) {
  const savedCallback = React.useRef<() => void | null>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}


export default useAnimationFrame;
