import styles from '@/app/components/atoms/atoms.module.css';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateUuid } from '@/app/utils/uuid';

interface DropdownProps {
  list: string[];
  open: boolean;
  handleClose: ((param: boolean) => void) | undefined;
  handlePath: (param: string) => URL;
  handleLogout?: () => void | undefined;
}

const Dropdown = (dropdownProps: DropdownProps) => {
  const router = useRouter();
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
          <li key={generateUuid()}>
            <Link
              href={handlePath(selectElem)}
              onClick={handleDropLogout(selectElem)}
            >
              {selectElem}
            </Link>
          </li>
        ))}
    </div>
  );
};

export default Dropdown;
