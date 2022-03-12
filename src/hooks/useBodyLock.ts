import { useEffect } from 'react';

const useBodyLock = (shouldLockBody: boolean) => {
  useEffect(() => {
    if (shouldLockBody) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  }, [shouldLockBody]);
};

export default useBodyLock;
