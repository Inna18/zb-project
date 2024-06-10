import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    open,
    close,
    isOpen,
  };
};
