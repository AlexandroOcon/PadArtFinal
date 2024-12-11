import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - PadArt`;
        } else {
            document.title = 'PadArt | The Perfect Store';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
