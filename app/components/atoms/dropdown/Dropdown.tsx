import styles from '../atoms.module.css';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DropdownProps {
  list: string[];
  open: boolean;
  handleOpen: (param: boolean) => void;
  handlePath: (param: string) => URL;
  handleLogout?: () => void | undefined;
}

const Dropdown = (dropdownProps: DropdownProps) => {
  const router = useRouter();
  const { list, open, handleOpen, handlePath, handleLogout } = dropdownProps;

  return (
    <div
      className={styles['dropdown-section']}
      onMouseLeave={() => handleOpen(false)}
    >
      {open &&
        list.map((selectElem, idx) => (
          <li key={idx}>
            <Link href={handlePath(selectElem)} 
                  onClick={selectElem=='logout'&&handleLogout?()=>handleLogout():undefined}>
              {selectElem}
            </Link>
          </li>
        ))}
    </div>
  );
};

export default Dropdown;
