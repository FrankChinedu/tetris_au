import { useEffect, useState, useMemo, useCallback } from 'react';

const isWindowType = typeof window === 'object';
const useWindowSize = () => {
    const [isClient] = useState(() => isWindowType)

    const getSize = useMemo(
        () => ({
            height: isClient ? window.innerHeight : null,
            width: isClient ? window.innerWidth : null,
        }), [isClient]
    );

    const [windowSize, setWindowSize] = useState(getSize);

    const handleResize = useCallback(() => {
        return setWindowSize(getSize);
    },[getSize])

    useEffect(() => {
        if (isClient) {
            window.addEventListener('resize', handleResize);
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [isClient, handleResize]);

    return windowSize;
};


export default useWindowSize;