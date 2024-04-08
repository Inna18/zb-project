import styles from '../atoms.module.css';

import React from 'react';
import Link from 'next/link';

interface DropdownProps {
  list: string[];
  open: boolean;
  handleOpen: (param: boolean) => void;
}

const Dropdown = (dropdownProps: DropdownProps) => {
  const { list, open, handleOpen } = dropdownProps;

  return (
    <div
      className={styles['dropdown-section']}
      onMouseLeave={() => handleOpen(false)}
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
