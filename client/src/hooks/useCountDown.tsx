import { useEffect, useState } from 'react';

const useCountDown = () => {
    const [time, setTime] = useState('')
    const [isOver, setIsOver] = useState(false);
    const [duration, setDuration] = useState(0)

    useEffect(() => {
    let timer: number = +duration;
    let ref: any;
    if (duration > 0) {
        ref = setInterval(function () {
            let minutes: number | string = parseInt(String(timer / 60))
            let seconds: number | string = parseInt(String(timer % 60));
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            setTime(minutes + ":" + seconds);
    
            if (--timer < 0) {
                timer = duration;
                setIsOver(true)
                clearInterval(ref);
            }
        }, 1000);
    }

    return () => {
        clearInterval(ref);
    }
    }, [duration]);

    return {time, isOver, setDuration};
}

export default useCountDown;