import styles from '../atoms.module.css';

import React from 'react';
import Link from 'next/link';

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
        list.map((selectElem, idx) => (
          <li key={idx}>
            <Link href={`/${selectElem}`}>{selectElem}</Link>
          </li>
        ))}
    </div>
  );
};

export default Dropdown;
