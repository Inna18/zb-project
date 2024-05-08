import styles from '@/app/components/atoms/atoms.module.css';

import React from 'react';
import Link from 'next/link';

interface DropdownProps {
  list: { id: number; value: string }[];
  open: boolean;
  handleClose: ((param: boolean) => void) | undefined;
  handlePath: (param: string) => URL;
  handleLogout?: () => void | undefined;
}

const Dropdown = (dropdownProps: DropdownProps) => {
  const { list, open, handleClose, handlePath, handleLogout } = dropdownProps;

  const handleDropLogout = (selectedElem: string) => {
    if (selectedElem === 'logout' && handleLogout) return () => handleLogout();
    else return undefined;
  };

  return (
    <div
      className={styles['dropdown-section']}
      onMouseLeave={handleClose ? () => handleClose(false) : undefined}
    >
      {open &&
        list.map((selectElem) => (
          <li key={selectElem.id}>
            <Link
              href={handlePath(selectElem.value)}
              onClick={handleDropLogout(selectElem.value)}
            >
              {selectElem.value}
            </Link>
          </li>
        ))}
    </div>
  );
};

export default Dropdown;
