import styles from '../atoms.module.css';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DropdownProps {
  list: string[];
  open: boolean;
  handleOpen: ((param: boolean) => void) | undefined;
  handlePath: (param: string) => URL;
  handleLogout?: () => void | undefined;
}

const Dropdown = (dropdownProps: DropdownProps) => {
  const router = useRouter();
  const { list, open, handleOpen, handlePath, handleLogout } = dropdownProps;

  const handleDropOpen = () => {
    if (handleOpen) return () => handleOpen(false)
    else return undefined
  }

  const handleDropLogout = (selectedElem: string) => {
    if (selectedElem === 'logout' && handleLogout) return () => handleLogout();
    else return undefined;
  }

  return (
    <div
      className={styles['dropdown-section']}
      onMouseLeave={handleDropOpen}
    >
      {open &&
        list.map((selectElem, idx) => (
          <li key={idx}>
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
