import { useCallback, useState } from 'react';
import Modal from '../components/atoms/modal/Modal';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => setIsOpen(() => true), []);
  const close = useCallback(() => setIsOpen(() => false), []);

  return {
    open,
    close,
    isOpen,
  };
};
