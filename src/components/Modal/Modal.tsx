import { ReactNode, SyntheticEvent, useEffect, useRef } from 'react';
import cn from 'classnames';
import useBodyLock from '../../hooks/useBodyLock';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useBodyLock(isOpen);
  useEffect(() => {
    const escKeyHandler = (e: KeyboardEvent) =>
      e.key.toLowerCase() === 'escape' && closeModal();
    window.addEventListener('keydown', escKeyHandler);
    return () => {
      window.removeEventListener('keydown', escKeyHandler);
    };
  }, [closeModal]);

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

  const handleCloseModal = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'modal-background') closeModal();
  };

  return (
    <>
      {createPortal(
        <div
          className={cn(
            'fixed inset-0 z-30 -translate-y-full bg-black/25 opacity-0 backdrop-blur transition-all tl:p-8'
          )}
          onClick={handleCloseModal}
          id='modal-background'
          role='presentation'
          ref={modalRef}
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
