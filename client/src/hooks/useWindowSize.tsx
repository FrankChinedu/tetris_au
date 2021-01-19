import { useEffect, useState, useCallback } from 'react';

const useWindowSize = () => {
    const isClient = typeof window === 'object';

    const getSize = useCallback(
        () => ({
            height: isClient ? window.innerHeight : null,
            width: isClient ? window.innerWidth : null,
        }), [isClient]
    );

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (isClient) {
            window.addEventListener('resize', handleResize);
        }

        function handleResize() {
            setWindowSize(getSize());
        }
       
        return () => window.removeEventListener('resize', handleResize);
    }, [getSize, isClient]);

    return windowSize;
};


export default useWindowSize;