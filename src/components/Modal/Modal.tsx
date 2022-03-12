import {
  ReactNode,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import cn from 'classnames';
import useBodyLock from '../../hooks/useBodyLock';

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

  useLayoutEffect(() => {
    if (isOpen) {
      modalRef.current?.classList.add('translate-y-0', 'opacity-100');
      modalRef.current?.classList.remove('-translate-y-full', 'opacity-0');
    } else {
      modalRef.current?.classList.add('-translate-y-full', 'opacity-0');
      modalRef.current?.classList.remove('translate-y-0', 'opacity-100');
    }
  }, [isOpen]);

  const handleCloseModal = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'modal-background') closeModal();
  };

  // const handleOnTransitionEnd = () => {
  //   if (modalRef.current?.classList.contains('opacity-0')) {
  //     // modalRef.current?.classList.add('hidden');
  //     modalRef.current?.classList.remove('block');
  //   }
  // };

  return (
    <div
      className={cn(
        'fixed inset-0 z-30 -translate-y-full bg-black/25 opacity-0 backdrop-blur transition-all duration-100 tl:p-8'
      )}
      onClick={handleCloseModal}
      id='modal-background'
      role='presentation'
      // onTransitionEnd={handleOnTransitionEnd}
      ref={modalRef}
    >
      <div
        role='dialog'
        aria-labelledby='movie-details'
        aria-modal='true'
        className='flex h-full flex-col bg-white p-8 text-cyan-700 tl:mx-auto tl:max-w-2xl tl:rounded-lg'
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
