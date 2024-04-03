import Link from 'next/link';
import styles from './atoms.module.css';

import React, { useEffect } from 'react';

interface DropdownProps {
  list: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = (dropdownProps: DropdownProps) => {
  const { list, open, setOpen } = dropdownProps;

  return (
    <div
      className={styles['dropdown-section']}
      onMouseLeave={() => setOpen(false)}
    >
      {open &&
        list.map((el, idx) => (
          <li key={idx}>
            <Link href={`/${el}`}>{el}</Link>
          </li>
        ))}
    </div>
  );
};

export default Dropdown;
