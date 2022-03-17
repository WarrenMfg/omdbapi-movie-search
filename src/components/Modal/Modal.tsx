import { ReactNode, SyntheticEvent, useEffect, useRef } from 'react';
import cn from 'classnames';
import useBodyLock from '../../hooks/useBodyLock';
import { createPortal } from 'react-dom';
import { FOCUSABLE_ELEMENTS, MODAL_BACKGROUND } from '../../utils/constants';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

/**
 * Modal shell used to wrap modal content
 */
const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const tabItemsRef = useRef<HTMLElement[] | null>(null);
  useBodyLock(isOpen);

  // Close modal when user presses the 'Escape' key
  useEffect(() => {
    const escKeyHandler = (e: KeyboardEvent) =>
      e.key.toLowerCase() === 'escape' && closeModal();
    window.addEventListener('keydown', escKeyHandler);
    return () => {
      window.removeEventListener('keydown', escKeyHandler);
    };
  }, [closeModal]);

  // Add a tab trap to keep focus within the modal
  useEffect(() => {
    window.addEventListener('keydown', trapTab);
    tabItemsRef.current = Array.from(
      modalRef.current?.querySelectorAll(FOCUSABLE_ELEMENTS) || []
    ) as HTMLElement[];
    tabItemsRef.current[0]?.focus();

    return () => window.removeEventListener('keydown', trapTab);
  }, [children]);

  // Basic animations for modal
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.classList.add('translate-y-0');
      modalRef.current?.classList.remove('-translate-y-full');
      setTimeout(() => {
        modalRef.current?.classList.add('opacity-100');
        modalRef.current?.classList.remove('opacity-0');
      }, 100);
    } else {
      modalRef.current?.classList.add('opacity-0');
      modalRef.current?.classList.remove('opacity-100');
      setTimeout(() => {
        modalRef.current?.classList.add('-translate-y-full');
        modalRef.current?.classList.remove('translate-y-0');
      }, 100);
    }
  }, [isOpen]);

  // Tab trap for useEffect above
  const trapTab = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'tab') {
      // shift + tab
      if (e.shiftKey) {
        if (document.activeElement === tabItemsRef.current?.[0]) {
          e.preventDefault();
          tabItemsRef.current?.[tabItemsRef.current.length - 1]?.focus();
        }
        // tab
      } else {
        if (
          document.activeElement ===
          tabItemsRef.current?.[tabItemsRef.current.length - 1]
        ) {
          e.preventDefault();
          tabItemsRef.current?.[0].focus();
        }
      }
    }
  };

  // Close modal handler when user clicks outside of modal
  const handleCloseModal = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === MODAL_BACKGROUND) closeModal();
  };

  // Append to body to bypass any relatively positioned elements
  return (
    <>
      {createPortal(
        <div
          className={cn(
            'fixed inset-0 z-30 -translate-y-full bg-black/25 opacity-0 backdrop-blur transition-all tl:p-8'
          )}
          onClick={handleCloseModal}
          id={MODAL_BACKGROUND}
          role='presentation'
          ref={modalRef}
          data-testid={MODAL_BACKGROUND}
        >
          <div
            role='dialog'
            id='movie-details'
            title='Movie Details'
            aria-modal='true'
            className='flex h-full flex-col bg-white p-8 text-cyan-700 tl:mx-auto tl:max-w-2xl tl:rounded-lg'
          >
            {isOpen && children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Modal;
