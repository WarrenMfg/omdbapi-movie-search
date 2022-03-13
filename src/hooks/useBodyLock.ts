import { useEffect } from 'react';

/**
 * Lock body when modal is open to prevent background scrolling
 */
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
